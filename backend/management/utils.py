# inquiries/utils.py

import requests
from django.conf import settings

def send_slack_notification(inquiry):
    message = f"""
📩 *새 문의가 접수되었습니다!*
*이름:* {inquiry.name}
*이메일:* {inquiry.email}
*회사:* {inquiry.company or '-'}
*전화번호:* {inquiry.phone or '-'}
*문의 내용:*\n{inquiry.message}
"""
    payload = {
        "text": message
    }

    webhook_url = settings.SLACK_WEBHOOK_URL
    try:
        requests.post(webhook_url, json=payload)
    except Exception as e:
        print("Slack 전송 실패:", e)
