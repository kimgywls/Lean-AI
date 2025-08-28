from django.utils import timezone
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Inquiry, Recruit
from .serializers import InquirySerializer, InquiryReplySerializer, RecruitSerializer
from .utils import send_slack_notification


# 사용자용: 문의 등록
class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def perform_create(self, serializer):
        # print("✅ perform_create 도달 성공!")
        inquiry = serializer.save()


# 문의 등록 슬랙 알람
class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer

    def perform_create(self, serializer):
        inquiry = serializer.save()
        send_slack_notification(inquiry)


# 관리자용: 문의 전체 목록
class InquiryListAdminView(generics.ListAPIView):
    queryset = Inquiry.objects.all().order_by("-created_at")
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAdminUser]


# 관리자용: 문의 답변 작성
class InquiryReplyView(generics.UpdateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquiryReplySerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        send_mail(
            subject="[Lean-AI] 문의에 대한 답변입니다.",
            message=serializer.validated_data.get("reply_text", ""),
            from_email="no-reply@lean-ai.com",
            recipient_list=[instance.email],
            fail_silently=False,
        )

        return Response({"message": "답변이 성공적으로 전송되었습니다."})



# 관리자용: 채용 직무 등록
class RecruitPositionViewSet(viewsets.ModelViewSet):
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
            print("❌ 수정 validation 오류:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_update(serializer)
        return Response(serializer.data)
