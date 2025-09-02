# newsletter/views.py
from django.conf import settings
from django.db import IntegrityError
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import EmailMessage
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiExample
from .models import EmailSubscriber, NewsletterLog, NewsletterAttachment, NewsletterTemplate
from .serializers import EmailSubscriberSerializer, NewsletterLogSerializer, NewsletterTemplateSerializer


@extend_schema_view(
    list=extend_schema(
        summary="구독자 목록",
        description="이메일 구독자 목록을 조회합니다.",
        tags=["뉴스레터"],
    ),
    create=extend_schema(
        summary="구독 신청",
        description="새로운 이메일 구독을 신청합니다.",
        tags=["뉴스레터"],
        examples=[
            OpenApiExample(
                "구독 신청 예시",
                value={"email": "user@example.com"},
                request_only=True,
                response_only=False,
            ),
        ],
    ),
    retrieve=extend_schema(
        summary="구독자 상세",
        description="특정 구독자의 상세 정보를 조회합니다.",
        tags=["뉴스레터"],
    ),
    update=extend_schema(
        summary="구독자 정보 수정",
        description="구독자 정보를 수정합니다.",
        tags=["뉴스레터"],
    ),
    destroy=extend_schema(
        summary="구독 해지",
        description="이메일 구독을 해지합니다.",
        tags=["뉴스레터"],
    ),
)
class EmailSubscriberViewSet(viewsets.ModelViewSet):
    """이메일 구독자 관리"""
    queryset = EmailSubscriber.objects.all()
    serializer_class = EmailSubscriberSerializer

    def get_permissions(self):
        # POST 요청은 누구나 가능, 나머지는 인증 필요
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        raw_email = request.data.get("email", "")
        email = raw_email.strip().lower()

        serializer = self.get_serializer(data={"email": email})
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(
                    {"message": "구독 신청이 완료되었습니다. 감사합니다!"},
                    status=status.HTTP_201_CREATED
                )
            except IntegrityError:
                return Response(
                    {"email": ["해당 이메일은 이미 구독 중입니다."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"email": ["유효하지 않은 이메일 형식입니다."]},
            status=status.HTTP_400_BAD_REQUEST
        )


@extend_schema_view(
    list=extend_schema(
        summary="뉴스레터 발송 이력",
        description="뉴스레터 발송 이력을 조회합니다.",
        tags=["뉴스레터"],
    ),
    create=extend_schema(
        summary="뉴스레터 발송",
        description="새로운 뉴스레터를 작성하고 모든 구독자에게 발송합니다.",
        tags=["뉴스레터"],
        examples=[
            OpenApiExample(
                "뉴스레터 발송 예시",
                value={
                    "subject": "Lean-AI 뉴스레터",
                    "message": "안녕하세요! Lean-AI의 최신 소식을 전해드립니다.",
                    "file": "첨부파일 (선택사항)"
                },
                request_only=True,
                response_only=False,
            ),
        ],
    ),
    retrieve=extend_schema(
        summary="뉴스레터 상세",
        description="특정 뉴스레터 발송 이력의 상세 내용을 조회합니다.",
        tags=["뉴스레터"],
    ),
)
class NewsletterLogViewSet(viewsets.ModelViewSet):
    """뉴스레터 발송 로그 관리"""
    queryset = NewsletterLog.objects.all().order_by('-sent_at')
    serializer_class = NewsletterLogSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        subject = request.data.get("subject", "").strip()
        message = request.data.get("message", "").strip()

        if not subject or not message:
            return Response(
                {"error": "제목과 내용은 필수입니다."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        subscribers = EmailSubscriber.objects.values_list("email", flat=True)
        if not subscribers:
            return Response(
                {"error": "구독 중인 사용자가 없습니다."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 뉴스레터 로그 저장
        log = NewsletterLog.objects.create(subject=subject, message=message)

        # 첨부 파일 처리
        attachments = request.FILES.getlist("file")

        # 첨부파일 저장 (DB + 파일시스템)
        for attachment in attachments:
            NewsletterAttachment.objects.create(log=log, attachments=attachment)

        # 이메일 발송
        try:
            for email in subscribers:
                email_msg = EmailMessage(
                    subject=subject,
                    body=message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[email],
                )
                
                for attachment in attachments:
                    attachment.seek(0)
                    email_msg.attach(attachment.name, attachment.read(), attachment.content_type)

                email_msg.send(fail_silently=False)

            serializer = self.get_serializer(log)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            # 이메일 발송 실패 시 로그 삭제
            log.delete()
            return Response(
                {"error": "뉴스레터 발송에 실패했습니다."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema_view(
    list=extend_schema(
        summary="템플릿 목록",
        description="뉴스레터 템플릿 목록을 조회합니다.",
        tags=["뉴스레터"],
    ),
    create=extend_schema(
        summary="템플릿 생성",
        description="새로운 뉴스레터 템플릿을 생성합니다.",
        tags=["뉴스레터"],
        examples=[
            OpenApiExample(
                "템플릿 생성 예시",
                value={
                    "title": "월간 뉴스레터",
                    "content": "이번 달의 주요 소식을 전해드립니다."
                },
                request_only=True,
                response_only=False,
            ),
        ],
    ),
    retrieve=extend_schema(
        summary="템플릿 상세",
        description="특정 템플릿의 상세 내용을 조회합니다.",
        tags=["뉴스레터"],
    ),
    update=extend_schema(
        summary="템플릿 수정",
        description="뉴스레터 템플릿을 수정합니다.",
        tags=["뉴스레터"],
    ),
    destroy=extend_schema(
        summary="템플릿 삭제",
        description="뉴스레터 템플릿을 삭제합니다.",
        tags=["뉴스레터"],
    ),
)
class NewsletterTemplateViewSet(viewsets.ModelViewSet):
    """뉴스레터 템플릿 관리"""
    queryset = NewsletterTemplate.objects.all().order_by("-created_at")
    serializer_class = NewsletterTemplateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            template = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            template = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "템플릿이 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)


@extend_schema_view(
    post=extend_schema(
        summary="관리자 로그인",
        description="관리자 계정으로 로그인하여 JWT 토큰을 발급받습니다.",
        tags=["인증"],
        examples=[
            OpenApiExample(
                "로그인 예시",
                value={
                    "username": "admin",
                    "password": "password123"
                },
                request_only=True,
                response_only=False,
            ),
        ],
    )
)
class AdminLoginView(APIView):
    """관리자 로그인"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        if not username or not password:
            return Response({"error": "사용자명과 비밀번호를 입력해주세요."}, status=400)
        
        user = authenticate(request, username=username, password=password)

        if user and user.is_staff:
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token)
            })
        return Response({"error": "인증 실패"}, status=401)
    
    