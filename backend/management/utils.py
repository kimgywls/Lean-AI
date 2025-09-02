# inquiries/utils.py

import requests
from django.conf import settings


def send_slack_notification(inquiry):
    """Slack으로 문의 알림 전송"""
    message = f"""
📩 *새 문의가 접수되었습니다!*
*이름:* {inquiry.name}
*이메일:* {inquiry.email}
*회사:* {inquiry.company or '-'}
*전화번호:* {inquiry.phone or '-'}
*서비스 유형:* {inquiry.service_type or '-'}
*관심 분야:* {inquiry.interest or '-'}
*문의 내용:*\n{inquiry.message}
"""
    
    payload = {"text": message}
    webhook_url = settings.SLACK_WEBHOOK_URL
    
    if not webhook_url:
        print("⚠️ SLACK_WEBHOOK_URL이 설정되지 않았습니다.")
        return
    
    try:
        response = requests.post(webhook_url, json=payload, timeout=10)
        response.raise_for_status()
        print("✅ Slack 알림 전송 성공")
    except requests.exceptions.RequestException as e:
        print(f"❌ Slack 전송 실패: {e}")
    except Exception as e:
        print(f"❌ 예상치 못한 오류: {e}")
