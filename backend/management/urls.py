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
    # 문의 관련
    path("inquiry/", InquiryCreateView.as_view(), name="inquiry-create"),
    path("inquiry/admin/", InquiryListAdminView.as_view(), name="inquiry-admin-list"),
    path("inquiry/admin/<int:pk>/", InquiryReplyView.as_view(), name="inquiry-admin-reply"),
]

urlpatterns += router.urls

"""
API 엔드포인트 설명:

문의 관련:
- POST /api/inquiry/                    : 사용자 문의 제출
- GET  /api/inquiry/admin/              : 관리자용 문의 목록 조회
- PATCH /api/inquiry/admin/<pk>/        : 관리자용 문의 답변 등록/수정

채용 관련:
- GET    /api/recruit/                  : 채용 정보 목록 조회
- POST   /api/recruit/                  : 채용 정보 등록 (인증 필요)
- GET    /api/recruit/<pk>/             : 특정 채용 정보 조회
- PUT    /api/recruit/<pk>/             : 채용 정보 수정 (인증 필요)
- DELETE /api/recruit/<pk>/             : 채용 정보 삭제 (인증 필요)
"""