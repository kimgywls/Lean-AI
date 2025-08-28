# newsletter/serializers.py
from rest_framework import serializers
from .models import (
    EmailSubscriber,
    NewsletterLog,
    NewsletterAttachment,
    NewsletterTemplate,
)


class EmailSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscriber
        fields = "__all__"


class NewsletterAttachmentSerializer(serializers.ModelSerializer):
    attachments_url = serializers.SerializerMethodField()
    filename = serializers.SerializerMethodField()

    class Meta:
        model = NewsletterAttachment
        fields = ["id", "attachments_url", "filename"]

    def get_attachments_url(self, obj):
        return obj.attachments.url

    def get_filename(self, obj):
        return obj.attachments.name.split("/")[-1]  # 실제 파일명만 추출



class NewsletterLogSerializer(serializers.ModelSerializer):
    attachments = NewsletterAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = NewsletterLog
        fields = ["id", "subject", "message", "sent_at", "attachments"]


class NewsletterTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterTemplate
        fields = "__all__"
