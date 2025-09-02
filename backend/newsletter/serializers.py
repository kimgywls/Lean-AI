# newsletter/serializers.py
from rest_framework import serializers
from .models import (
    EmailSubscriber,
    NewsletterLog,
    NewsletterAttachment,
    NewsletterTemplate,
)


class EmailSubscriberSerializer(serializers.ModelSerializer):
    """이메일 구독자 시리얼라이저"""
    class Meta:
        model = EmailSubscriber
        fields = "__all__"
        read_only_fields = ["subscribed_at"]


class NewsletterAttachmentSerializer(serializers.ModelSerializer):
    """뉴스레터 첨부파일 시리얼라이저"""
    attachments_url = serializers.SerializerMethodField()
    filename = serializers.SerializerMethodField()

    class Meta:
        model = NewsletterAttachment
        fields = ["id", "attachments_url", "filename"]

    def get_attachments_url(self, obj):
        return obj.attachments.url

    def get_filename(self, obj):
        return obj.attachments.name.split("/")[-1]


class NewsletterLogSerializer(serializers.ModelSerializer):
    """뉴스레터 로그 시리얼라이저"""
    attachments = NewsletterAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = NewsletterLog
        fields = ["id", "subject", "message", "sent_at", "attachments"]
        read_only_fields = ["sent_at"]


class NewsletterTemplateSerializer(serializers.ModelSerializer):
    """뉴스레터 템플릿 시리얼라이저"""
    class Meta:
        model = NewsletterTemplate
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]
