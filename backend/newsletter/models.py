from django.db import models

# 구독 신청 이메일
class EmailSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    

# 뉴스 레터
class NewsletterLog(models.Model):
    subject = models.CharField(max_length=255)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject
    
# 뉴스 레더 첨부 파일 정보
class NewsletterAttachment(models.Model):
    log = models.ForeignKey(NewsletterLog, related_name="attachments", on_delete=models.CASCADE)
    attachments = models.FileField(upload_to="newsletters/")

    def __str__(self):
        return self.attachments.name
    
    
# 뉴스 레터 템플릿
class NewsletterTemplate(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)