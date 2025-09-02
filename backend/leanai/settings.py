from pathlib import Path
import os
import sys
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

    DATABASE_PATH = os.environ.get("DATABASE_PATH", "/tmp")
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
    "lean-ai.vercel.app",
    "lean-ai-backend.onrender.com",
]

# CORS 설정
CORS_ALLOW_ALL_ORIGINS = True

# CORS 허용 origin 목록
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://lean-ai.vercel.app",
    "https://lean-ai-backend.onrender.com",
    "https://domain.com",
]

# CSRF 신뢰할 수 있는 origin
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",     
    "http://localhost:3001",      
    "https://lean-ai.vercel.app",
    "https://lean-ai-backend.onrender.com",
]

# 설치된 앱 목록
INSTALLED_APPS = [
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "drf_spectacular",
    "management",
    "newsletter",
]

# 미들웨어 설정
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# URL 루트 설정
ROOT_URLCONF = "leanai.urls"

# 템플릿 설정
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
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

# 패스워드 검증 관련 설정
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
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# JWT 설정
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=24),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}

# drf-spectacular 설정
SPECTACULAR_SETTINGS = {
    "TITLE": "Lean-AI API",
    "DESCRIPTION": "Lean-AI 백엔드 API 문서",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
    "SWAGGER_UI_SETTINGS": {
        "deepLinking": True,
        "persistAuthorization": True,
        "displayOperationId": True,
    },
    "TAGS": [
        {"name": "문의", "description": "문의 관련 API"},
        {"name": "채용", "description": "채용 정보 관련 API"},
        {"name": "뉴스레터", "description": "뉴스레터 관련 API"},
        {"name": "인증", "description": "관리자 인증 API"},
    ],
}

# 국제화 설정
LANGUAGE_CODE = "ko-kr"
TIME_ZONE = "Asia/Seoul"
USE_I18N = True
USE_TZ = True

# 정적 파일 및 미디어 설정
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# 기본 PK 필드 타입
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# 이메일 발송 설정
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = GMAIL_ACCOUNT
EMAIL_HOST_PASSWORD = GMAIL_APP_PASSWORD
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# 보안 설정
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True