# inquiries/serializers.py

from rest_framework import serializers
from .models import Inquiry, Recruit


class InquirySerializer(serializers.ModelSerializer):
    """문의 시리얼라이저"""
    class Meta:
        model = Inquiry
        fields = "__all__"
        read_only_fields = ["created_at", "replied", "reply_text", "replied_at"]


class InquiryReplySerializer(serializers.ModelSerializer):
    """문의 답변 시리얼라이저"""
    class Meta:
        model = Inquiry
        fields = ["reply_text", "replied"]
        read_only_fields = ["replied"]


class RecruitSerializer(serializers.ModelSerializer):
    """채용 정보 시리얼라이저"""
    class Meta:
        model = Recruit
        fields = ["id", "name", "url", "created_at", "is_deleted", "deleted_at"]
        read_only_fields = ["created_at", "is_deleted", "deleted_at"]
