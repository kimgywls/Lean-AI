from django.utils import timezone
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiExample
from .models import Inquiry, Recruit
from .serializers import InquirySerializer, InquiryReplySerializer, RecruitSerializer
from .utils import send_slack_notification


@extend_schema_view(
    post=extend_schema(
        summary="문의 등록",
        description="사용자가 새로운 문의를 등록합니다.",
        tags=["문의"],
        examples=[
            OpenApiExample(
                "문의 등록 예시",
                value={
                    "company": "Lean-AI",
                    "name": "홍길동",
                    "email": "hong@example.com",
                    "phone": "010-1234-5678",
                    "service_type": "AI 개발",
                    "interest": "머신러닝",
                    "message": "AI 프로젝트에 대해 문의드립니다.",
                    "agree": True
                },
                request_only=True,
                response_only=False,
            ),
        ],
    )
)
class InquiryCreateView(generics.CreateAPIView):
    """사용자용: 문의 등록"""
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def perform_create(self, serializer):
        inquiry = serializer.save()
        # Slack 알림 전송
        send_slack_notification(inquiry)


@extend_schema_view(
    get=extend_schema(
        summary="문의 목록 조회",
        description="관리자가 모든 문의 목록을 조회합니다.",
        tags=["문의"],
    )
)
class InquiryListAdminView(generics.ListAPIView):
    """관리자용: 문의 전체 목록"""
    queryset = Inquiry.objects.all().order_by("-created_at")
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAdminUser]


@extend_schema_view(
    patch=extend_schema(
        summary="문의 답변 작성",
        description="관리자가 문의에 대한 답변을 작성하고 이메일로 전송합니다.",
        tags=["문의"],
        examples=[
            OpenApiExample(
                "답변 작성 예시",
                value={
                    "reply_text": "문의해주셔서 감사합니다. 검토 후 연락드리겠습니다.",
                    "replied": True
                },
                request_only=True,
                response_only=False,
            ),
        ],
    )
)
class InquiryReplyView(generics.UpdateAPIView):
    """관리자용: 문의 답변 작성"""
    queryset = Inquiry.objects.all()
    serializer_class = InquiryReplySerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        # 이메일 발송
        try:
            send_mail(
                subject="[Lean-AI] 문의에 대한 답변입니다.",
                message=serializer.validated_data.get("reply_text", ""),
                from_email="no-reply@lean-ai.com",
                recipient_list=[instance.email],
                fail_silently=False,
            )
            return Response({"message": "답변이 성공적으로 전송되었습니다."})
        except Exception as e:
            return Response(
                {"error": "이메일 발송에 실패했습니다."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema_view(
    list=extend_schema(
        summary="채용 정보 목록",
        description="등록된 채용 정보 목록을 조회합니다.",
        tags=["채용"],
    ),
    create=extend_schema(
        summary="채용 정보 등록",
        description="새로운 채용 정보를 등록합니다.",
        tags=["채용"],
        examples=[
            OpenApiExample(
                "채용 정보 등록 예시",
                value={
                    "name": "AI 엔지니어",
                    "url": "https://example.com/recruit/ai-engineer"
                },
                request_only=True,
                response_only=False,
            ),
        ],
    ),
    retrieve=extend_schema(
        summary="채용 정보 상세",
        description="특정 채용 정보의 상세 내용을 조회합니다.",
        tags=["채용"],
    ),
    update=extend_schema(
        summary="채용 정보 수정",
        description="채용 정보를 수정합니다.",
        tags=["채용"],
    ),
    destroy=extend_schema(
        summary="채용 정보 삭제",
        description="채용 정보를 논리 삭제합니다.",
        tags=["채용"],
    ),
)
class RecruitPositionViewSet(viewsets.ModelViewSet):
    """관리자용: 채용 직무 등록/관리"""
    serializer_class = RecruitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:  # 조회는 누구나 가능
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        return Recruit.objects.filter(is_deleted=False).order_by("-created_at")

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_update(serializer)
        return Response(serializer.data)
