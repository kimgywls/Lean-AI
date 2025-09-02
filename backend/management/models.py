# management/models.py

from django.db import models


class Inquiry(models.Model):
    """문의 모델"""
    company = models.CharField(max_length=255, blank=True, verbose_name="회사명", help_text="회사명 (선택사항)")
    name = models.CharField(max_length=100, verbose_name="이름", help_text="문의자 이름")
    email = models.EmailField(verbose_name="이메일", help_text="문의자 이메일 주소")
    phone = models.CharField(max_length=20, blank=True, verbose_name="전화번호", help_text="연락처 (선택사항)")
    service_type = models.CharField(max_length=30, blank=True, verbose_name="서비스 유형", help_text="관심 있는 서비스 유형")
    interest = models.CharField(max_length=30, blank=True, verbose_name="관심 분야", help_text="관심 있는 분야")
    message = models.TextField(verbose_name="문의 내용", help_text="상세 문의 내용")
    agree = models.BooleanField(default=False, verbose_name="개인정보 동의", help_text="개인정보 수집 및 이용 동의")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일시")
    replied = models.BooleanField(default=False, verbose_name="답변 여부")
    reply_text = models.TextField(blank=True, verbose_name="답변 내용", help_text="관리자 답변 내용")
    replied_at = models.DateTimeField(auto_now=True, verbose_name="답변일시")

    class Meta:
        verbose_name = "문의"
        verbose_name_plural = "문의 목록"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.email}"


class Recruit(models.Model):
    """채용 정보 모델"""
    name = models.CharField(max_length=100, verbose_name="직무명", help_text="채용 직무명")
    url = models.URLField(max_length=1000, verbose_name="채용 링크", help_text="채용 공고 링크")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일시")
    is_deleted = models.BooleanField(default=False, verbose_name="삭제 여부")
    deleted_at = models.DateTimeField(auto_now=True, verbose_name="삭제일시")

    class Meta:
        verbose_name = "채용 정보"
        verbose_name_plural = "채용 정보 목록"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name