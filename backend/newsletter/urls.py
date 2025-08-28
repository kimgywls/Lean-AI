from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EmailSubscriberViewSet, AdminLoginView, NewsletterLogViewSet, NewsletterTemplateViewSet

router = DefaultRouter()
router.register(r'email-subscribers', EmailSubscriberViewSet, basename='email-subscriber')
router.register(r'newsletter-logs', NewsletterLogViewSet, basename='newsletter-log')
router.register(r'newsletter-templates', NewsletterTemplateViewSet, basename='newsletter-templates')


urlpatterns = [
    path("admin/login/", AdminLoginView.as_view(), name="admin-login"),
]

urlpatterns += router.urls

'''
Endpoint	                    Method	                    설명
/email-subscribers/	            GET	                        구독자 목록 (관리자 인증 필요)
/email-subscribers/	            POST	                    구독 신청 (누구나 가능)
/email-subscribers/{id}/	    GET	                        특정 구독자 상세 (옵션)
/admin/login/	                POST	                    관리자 로그인
/newsletter-logs/               GET                         발송 이력 전체 조회 (list)
/newsletter-logs/<pk>/          GET                         특정 이력 상세 조회
/newsletter-logs/               POST                        발송 이력 생성 (create)
'''