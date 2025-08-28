# inquiries/serializers.py

from rest_framework import serializers
from .models import Inquiry, Recruit


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = "__all__"


class InquiryReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ["reply_text", "replied"]


class RecruitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruit
        fields = ["id", "name", "url", "created_at", "is_deleted", "deleted_at"]
