from pathlib import Path
import os

# my_settings.py 파일의 디렉터리 경로를 기준으로 BASE_DIR 설정
BASE_DIR = Path(__file__).resolve().parent

SECRET_KEY = 'django-insecure-1-d+ugc50wgfpoq@r6n5#l99_%9l^m=+x#n!-rdqd-f%5o7#fc'
#SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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' # 실제 SLACK


# 데이터베이스 설정
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'subscriber_db.sqlite3',
    },
}

DATABASE_PATH = "subscriber_db.sqlite3"
BACKUP_DIR = "backups"

# 이메일 설정
GMAIL_APP_PASSWORD = "pual nofy xfos qkbb"
GMAIL_ACCOUNT = "hjkim0213@lean-ai.com"