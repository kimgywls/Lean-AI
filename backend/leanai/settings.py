from pathlib import Path
import os, sys
from datetime import datetime, timedelta


# BASE_DIR는 프로젝트의 최상위 경로를 의미합니다.
BASE_DIR = Path(__file__).resolve().parent.parent

# my_settings.py에 민감한 정보(SECRET_KEY, DB 정보 등)를 분리 저장합니다.
MY_SETTINGS_PATH = os.path.join(BASE_DIR, "my_settings.py")
sys.path.append(os.path.dirname(MY_SETTINGS_PATH))

# my_settings.py에서 필요한 값들을 가져옵니다.
try:
    from my_settings import (
        SECRET_KEY,
        DATABASES,
        DATABASE_PATH,
        BACKUP_DIR,
        GMAIL_APP_PASSWORD,
        GMAIL_ACCOUNT,
        SLACK_WEBHOOK_URL,
    )
except ImportError:
    # my_settings.py가 없으면 환경변수로 대체
    SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.environ.get("DB_NAME"),
            "USER": os.environ.get("DB_USER"),
            "PASSWORD": os.environ.get("DB_PASSWORD"),
            "HOST": os.environ.get("DB_HOST"),
            "PORT": os.environ.get("DB_PORT", "5432"),
        }
    }

    DATABASE_PATH = os.environ.get("DATABASE_PATH", "/tmp")  # 필요에 따라
    BACKUP_DIR = os.environ.get("BACKUP_DIR", "/tmp/backups")

    GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD")
    GMAIL_ACCOUNT = os.environ.get("GMAIL_ACCOUNT")

    SLACK_WEBHOOK_URL = os.environ.get("SLACK_WEBHOOK_URL")


# 디버그 모드 (배포 환경에서는 반드시 False로 변경!)
DEBUG = True

# 허용된 호스트 (배포 시 도메인 추가 필요)
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "lean-ai.vercel.app",  # Vercel 배포용
    "lean-ai-backend.onrender.com",  # 지금 사용하는 ngrok 주소
]

# CORS 설정: 모든 도메인에서 요청 허용 (개발용, 배포 시 제한 권장)
CORS_ALLOW_ALL_ORIGINS = True

# CORS 허용 origin 목록 (프론트 도메인 포함)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # 로컬 개발용
    "http://localhost:3001",  # 로컬 개발용
    "https://lean-ai.vercel.app",  # vercel 개발용
    "https://lean-ai-backend.onrender.com",
    "https://domain.com",  # 실제 운영 도메인
]

# 프론트에서 들어오는 도메인 허용
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",     
    "http://localhost:3001",      
    "https://lean-ai.vercel.app",
    "https://lean-ai-backend.onrender.com",  # ngrok 주소 허용
]

# 설치된 앱 목록
INSTALLED_APPS = [
    "corsheaders",  # CORS 허용을 위한 미들웨어
    "django.contrib.admin",  # 관리자 페이지
    "django.contrib.auth",  # 인증 기능
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",  # DRF (Django REST Framework
    "management",
    "newsletter",  # 뉴스레터 앱
]

# 미들웨어 설정
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # CORS 미들웨어 (가장 위에 위치해야 함)
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",  # CSRF 보호
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# URL 루트 설정
ROOT_URLCONF = "leanai.urls"

# 템플릿 설정 (보통 DRF 기반 API만 쓰면 크게 쓰이지 않음)
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # 템플릿 폴더 경로 설정 가능
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# WSGI 서버 설정
WSGI_APPLICATION = "leanai.wsgi.application"

# 패스워드 검증 관련 설정 (보안 관련)
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# DRF 설정
REST_FRAMEWORK = {
    # 인증 방식: JWT 인증 사용
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

# JWT 설정
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=24),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

# 국제화 설정
LANGUAGE_CODE = "en-us"  # 언어 설정 (한국어는 'ko-kr')
TIME_ZONE = "Asia/Seoul"  # 시간대 설정 (한국은 'Asia/Seoul')
USE_I18N = True
USE_TZ = True

# 정적 파일 경로 설정
STATIC_URL = "static/"

# 기본 PK 필드 타입
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# 이메일 발송 설정
# EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"  # ✅ 개발 시 콘솔로 이메일 확인
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"  # ✅ 실제 메일 발송용 (주석 해제 시 사용)
EMAIL_HOST = "smtp.gmail.com"  # Gmail
EMAIL_PORT = 587  # Gmail SMTP 포트 (TLS)
EMAIL_USE_TLS = True  # TLS 사용 (True 권장)
EMAIL_HOST_USER = GMAIL_ACCOUNT  # 이메일 계정
EMAIL_HOST_PASSWORD = GMAIL_APP_PASSWORD  # Gmail 앱 비밀번호 (my_settings.py에 저장됨)
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER  # 발신자 기본 이메일


MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'