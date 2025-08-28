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
from .models import EmailSubscriber, NewsletterLog, NewsletterAttachment,NewsletterTemplate
from .serializers import EmailSubscriberSerializer, NewsletterLogSerializer, NewsletterTemplateSerializer


class EmailSubscriberViewSet(viewsets.ModelViewSet):
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
                    {"email": ["해당 이메일은 이미 구독 중입니다.."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"email": ["해당 이메일은 이미 구독 중입니다."]},
            status=status.HTTP_400_BAD_REQUEST
        )
        

class NewsletterLogViewSet(viewsets.ModelViewSet):
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
        attachments = request.FILES.getlist("file")  # ⚠️ 프론트에서 'file' 키로 보내는 것은 유지

        # 첨부파일 저장 (DB + 파일시스템)
        for f in attachments:
            NewsletterAttachment.objects.create(log=log, attachments=f)

        # 이메일 발송
        for email in subscribers:
            email_msg = EmailMessage(
                subject=subject,
                body=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email],
            )
            for f in attachments:
                f.seek(0)
                email_msg.attach(f.name, f.read(), f.content_type)

            email_msg.send(fail_silently=False)

        serializer = self.get_serializer(log)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class NewsletterTemplateViewSet(viewsets.ModelViewSet):
    queryset = NewsletterTemplate.objects.all().order_by("-created_at")
    serializer_class = NewsletterTemplateSerializer
    permission_classes = [IsAuthenticated]

    # 🔹 템플릿 생성 (POST)
    def create(self, request, *args, **kwargs):
        #print(f"데이터 확인 : ",request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            template = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 🔹 템플릿 수정 (PUT/PATCH)
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # PATCH 지원
        if serializer.is_valid():
            template = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 🔹 템플릿 삭제 (DELETE)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "템플릿이 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)



class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(request, username=username, password=password)

        if user and user.is_staff:
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token)
            })
        return Response({"error": "인증 실패"}, status=401)
    
    