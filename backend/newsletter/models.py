from django.db import models


class EmailSubscriber(models.Model):
    """구독 신청 이메일 모델"""
    email = models.EmailField(unique=True, verbose_name="이메일", help_text="구독 신청 이메일 주소")
    subscribed_at = models.DateTimeField(auto_now_add=True, verbose_name="구독일시")

    class Meta:
        verbose_name = "이메일 구독자"
        verbose_name_plural = "이메일 구독자 목록"
        ordering = ["-subscribed_at"]

    def __str__(self):
        return self.email


class NewsletterLog(models.Model):
    """뉴스레터 발송 로그 모델"""
    subject = models.CharField(max_length=255, verbose_name="제목", help_text="뉴스레터 제목")
    message = models.TextField(verbose_name="내용", help_text="뉴스레터 내용")
    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="발송일시")

    class Meta:
        verbose_name = "뉴스레터 로그"
        verbose_name_plural = "뉴스레터 로그 목록"
        ordering = ["-sent_at"]

    def __str__(self):
        return self.subject


class NewsletterAttachment(models.Model):
    """뉴스레터 첨부 파일 모델"""
    log = models.ForeignKey(
        NewsletterLog, 
        related_name="attachments", 
        on_delete=models.CASCADE,
        verbose_name="뉴스레터 로그",
        help_text="연결된 뉴스레터 로그"
    )
    attachments = models.FileField(upload_to="newsletters/", verbose_name="첨부파일", help_text="뉴스레터 첨부 파일")

    class Meta:
        verbose_name = "뉴스레터 첨부파일"
        verbose_name_plural = "뉴스레터 첨부파일 목록"

    def __str__(self):
        return self.attachments.name


class NewsletterTemplate(models.Model):
    """뉴스레터 템플릿 모델"""
    title = models.CharField(max_length=200, verbose_name="템플릿 제목", help_text="템플릿 제목")
    content = models.TextField(verbose_name="템플릿 내용", help_text="템플릿 내용")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일시")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일시")

    class Meta:
        verbose_name = "뉴스레터 템플릿"
        verbose_name_plural = "뉴스레터 템플릿 목록"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.title