# inquiries/urls.py

from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    InquiryCreateView,
    InquiryListAdminView,
    InquiryReplyView,
    RecruitPositionViewSet,
)

router = DefaultRouter()
router.register(r'recruit', RecruitPositionViewSet, basename='recruit')

urlpatterns = [
    path("inquiry/", InquiryCreateView.as_view(), name="inquiry-create"),  # 사용자용 POST
    path("inquiry/admin/", InquiryListAdminView.as_view(), name="inquiry-admin-list"),  # 관리자용 GET
    path("inquiry/admin/<int:pk>/", InquiryReplyView.as_view(), name="inquiry-admin-reply"),  # 관리자용 PATCH
]

urlpatterns += router.urls

'''
사용자 문의 작성 (POST)	            /api/inquiry/	                    사용자용 (문의 제출)
관리자 전체 목록 (GET)	            /api/inquiry/admin/	                관리자용 (모든 문의 보기)
관리자 답변 작성 (PATCH)	        /api/inquiry/admin/<pk>/	        관리자용 (답변 등록/수정)
'''