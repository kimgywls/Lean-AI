# Lean-AI Backend

Lean-AI의 백엔드 API 서버입니다. Django REST Framework를 기반으로 구축되었으며, 문의 관리, 채용 정보 관리, 뉴스레터 발송 등의 기능을 제공합니다.

## 🚀 주요 기능

### 📞 문의 관리 시스템
- **사용자 문의 등록**: 회사 정보, 연락처, 서비스 유형, 관심 분야 등을 포함한 문의 접수
- **관리자 문의 관리**: 문의 목록 조회, 답변 작성 및 이메일 발송
- **Slack 알림**: 새 문의 접수 시 Slack으로 실시간 알림

### 💼 채용 정보 관리
- **채용 공고 등록**: 직무명과 채용 링크를 포함한 채용 정보 관리
- **논리 삭제**: 채용 정보의 안전한 삭제 처리
- **공개 조회**: 등록된 채용 정보를 누구나 조회 가능

### 📧 뉴스레터 시스템
- **이메일 구독**: 사용자 이메일 구독 신청 및 관리
- **뉴스레터 발송**: 구독자들에게 뉴스레터 발송 및 첨부파일 지원
- **템플릿 관리**: 재사용 가능한 뉴스레터 템플릿 생성 및 관리
- **발송 이력**: 뉴스레터 발송 로그 및 통계

### 🔐 관리자 인증
- **JWT 기반 인증**: 보안성 높은 JWT 토큰 기반 인증 시스템
- **관리자 권한**: 관리자 전용 기능 접근 제어

## 🛠 기술 스택

### Backend Framework
- **Django 5.2**: 웹 프레임워크
- **Django REST Framework 3.16.0**: API 개발 프레임워크
- **Django CORS Headers**: Cross-Origin 요청 처리

### Database
- **PostgreSQL**: 메인 데이터베이스
- **psycopg2-binary**: PostgreSQL Python 어댑터

### Authentication & Security
- **djangorestframework-simplejwt**: JWT 인증 시스템
- **보안 미들웨어**: XSS 방지, HSTS, CSRF 보호

### API Documentation
- **drf-spectacular**: OpenAPI 3.0 스키마 생성
- **Swagger UI**: 인터랙티브 API 문서
- **ReDoc**: 대안 API 문서 뷰어

### Email & Notifications
- **SMTP (Gmail)**: 이메일 발송
- **Slack Webhook**: 실시간 알림

### Deployment
- **Gunicorn**: WSGI 서버
- **Vercel/Render**: 클라우드 배포 지원

## 📁 프로젝트 구조

```
backend/
├── leanai/                 # 프로젝트 설정
│   ├── settings.py        # Django 설정
│   ├── urls.py           # 메인 URL 설정
│   └── wsgi.py           # WSGI 설정
├── management/            # 문의 및 채용 관리 앱
│   ├── models.py         # 문의, 채용 모델
│   ├── views.py          # API 뷰
│   ├── serializers.py    # 데이터 직렬화
│   ├── urls.py           # URL 라우팅
│   └── utils.py          # 유틸리티 함수
├── newsletter/            # 뉴스레터 앱
│   ├── models.py         # 뉴스레터 관련 모델
│   ├── views.py          # 뉴스레터 API
│   ├── serializers.py    # 뉴스레터 직렬화
│   └── urls.py           # 뉴스레터 URL
├── requirements.txt       # Python 의존성
├── manage.py             # Django 관리 명령어
└── README.md             # 프로젝트 문서
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/Lean-AI.git
cd Lean-AI/backend
```

### 2. 가상환경 생성 및 활성화
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# 또는
venv\Scripts\activate     # Windows
```

### 3. 의존성 설치
```bash
pip install -r requirements.txt
```

### 4. 환경 설정
`my_settings.py` 파일을 생성하고 다음 정보를 설정하세요:

```python
# my_settings.py
SECRET_KEY = "your-secret-key"
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "your_db_name",
        "USER": "your_db_user",
        "PASSWORD": "your_db_password",
        "HOST": "your_db_host",
        "PORT": "5432",
    }
}
GMAIL_APP_PASSWORD = "your-gmail-app-password"
GMAIL_ACCOUNT = "your-email@gmail.com"
SLACK_WEBHOOK_URL = "your-slack-webhook-url"
```

### 5. 데이터베이스 마이그레이션
```bash
python manage.py migrate
```

### 6. 서버 실행
```bash
python manage.py runserver
```

## 📚 API 문서

### Swagger UI
- **URL**: `http://localhost:8000/api/docs/`
- **설명**: 인터랙티브한 API 문서 및 테스트 도구

### ReDoc
- **URL**: `http://localhost:8000/api/redoc/`
- **설명**: 깔끔한 API 문서 뷰어

### OpenAPI 스키마
- **URL**: `http://localhost:8000/api/schema/`
- **설명**: OpenAPI 3.0 형식의 API 스키마

## 🔌 API 엔드포인트

### 문의 관련 API
- `POST /api/inquiry/` - 사용자 문의 등록
- `GET /api/inquiry/admin/` - 관리자용 문의 목록 조회
- `PATCH /api/inquiry/admin/<pk>/` - 관리자용 문의 답변 작성

### 채용 관련 API
- `GET /api/recruit/` - 채용 정보 목록 조회
- `POST /api/recruit/` - 채용 정보 등록 (인증 필요)
- `GET /api/recruit/<pk>/` - 특정 채용 정보 조회
- `PUT /api/recruit/<pk>/` - 채용 정보 수정 (인증 필요)
- `DELETE /api/recruit/<pk>/` - 채용 정보 삭제 (인증 필요)

### 뉴스레터 관련 API
- `GET /api/newsletter/email-subscribers/` - 구독자 목록 조회
- `POST /api/newsletter/email-subscribers/` - 구독 신청
- `POST /api/newsletter/newsletter-logs/` - 뉴스레터 발송
- `GET /api/newsletter/newsletter-templates/` - 템플릿 목록 조회

### 인증 API
- `POST /api/newsletter/admin/login/` - 관리자 로그인

## 🔒 보안 기능

- **JWT 인증**: 토큰 기반 인증으로 보안성 향상
- **CORS 설정**: 허용된 도메인에서만 API 접근 가능
- **CSRF 보호**: Cross-Site Request Forgery 공격 방지
- **권한 제어**: 관리자 전용 기능에 대한 접근 제한
- **보안 헤더**: XSS 방지, HSTS 등 보안 헤더 설정

## 🌐 배포 환경

### 지원하는 배포 플랫폼
- **Vercel**: 프론트엔드 배포
- **Render**: 백엔드 API 배포
- **로컬 개발**: 개발 및 테스트 환경

### 환경 변수 설정
배포 시 다음 환경 변수를 설정하세요:
- `DJANGO_SECRET_KEY`
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
- `GMAIL_APP_PASSWORD`, `GMAIL_ACCOUNT`
- `SLACK_WEBHOOK_URL`

## 🧪 테스트

```bash
# 전체 테스트 실행
python manage.py test

# 특정 앱 테스트
python manage.py test management
python manage.py test newsletter
```

## 📝 개발 가이드

### 코드 스타일
- **Python**: PEP 8 준수
- **Django**: Django 코딩 스타일 가이드 준수
- **API**: RESTful API 설계 원칙 준수

### 커밋 메시지 규칙
- `feat:` - 새로운 기능 추가
- `fix:` - 버그 수정
- `refactor:` - 코드 리팩토링
- `docs:` - 문서 업데이트
- `style:` - 코드 스타일 변경
- `test:` - 테스트 추가/수정

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성하거나 담당자에게 연락해주세요.

---

**Lean-AI Backend** - AI 솔루션을 위한 강력한 백엔드 API 서버 🚀
