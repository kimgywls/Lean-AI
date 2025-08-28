# management/models.py

from django.db import models

class Inquiry(models.Model):
    company = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    serviceType = models.CharField(max_length=30, blank=True)
    interest = models.CharField(max_length=30, blank=True)
    message = models.TextField()
    agree = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    replied = models.BooleanField(default=False) # 관리자 답변 유무
    reply_text = models.TextField(blank=True)  # 관리자 답변 내용
    replied_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

class Recruit(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name