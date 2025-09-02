from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EmailSubscriberViewSet, AdminLoginView, NewsletterLogViewSet, NewsletterTemplateViewSet

router = DefaultRouter()
router.register(r'email-subscribers', EmailSubscriberViewSet, basename='email-subscriber')
router.register(r'newsletter-logs', NewsletterLogViewSet, basename='newsletter-log')
router.register(r'newsletter-templates', NewsletterTemplateViewSet, basename='newsletter-templates')

urlpatterns = [
    # 관리자 인증
    path("admin/login/", AdminLoginView.as_view(), name="admin-login"),
]

urlpatterns += router.urls

"""
API 엔드포인트 설명:

이메일 구독자:
- GET    /api/newsletter/email-subscribers/     : 구독자 목록 조회 (인증 필요)
- POST   /api/newsletter/email-subscribers/     : 구독 신청 (누구나 가능)
- GET    /api/newsletter/email-subscribers/<id>/: 특정 구독자 상세 조회 (인증 필요)
- PUT    /api/newsletter/email-subscribers/<id>/: 구독자 정보 수정 (인증 필요)
- DELETE /api/newsletter/email-subscribers/<id>/: 구독자 삭제 (인증 필요)

뉴스레터 로그:
- GET    /api/newsletter/newsletter-logs/       : 발송 이력 전체 조회 (인증 필요)
- POST   /api/newsletter/newsletter-logs/       : 뉴스레터 발송 (인증 필요)
- GET    /api/newsletter/newsletter-logs/<pk>/  : 특정 이력 상세 조회 (인증 필요)

뉴스레터 템플릿:
- GET    /api/newsletter/newsletter-templates/  : 템플릿 목록 조회 (인증 필요)
- POST   /api/newsletter/newsletter-templates/  : 템플릿 생성 (인증 필요)
- GET    /api/newsletter/newsletter-templates/<pk>/: 특정 템플릿 조회 (인증 필요)
- PUT    /api/newsletter/newsletter-templates/<pk>/: 템플릿 수정 (인증 필요)
- DELETE /api/newsletter/newsletter-templates/<pk>/: 템플릿 삭제 (인증 필요)

관리자 인증:
- POST   /api/newsletter/admin/login/           : 관리자 로그인
"""