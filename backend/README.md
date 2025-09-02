# Lean-AI Backend

> Lean-AI는 기업 고객을 위한 AI 솔루션 및 정부 지원 사업(데이터/AI 바우처 등) 안내를 목적으로 만들어진 웹 서비스입니다.

## 📋 프로젝트 개요

Lean-AI는 AI 솔루션을 도입하고자 하는 기업들을 위한 종합적인 웹 서비스로, 랜딩 페이지를 중심으로 기업 소개, 서비스 안내, 뉴스룸 및 관리자 기능으로 구성되어 있습니다.

## 🏗️ 기술 스택

| 구분                  | 기술                               |
| --------------------- | ---------------------------------- |
| **Backend**           | Django 5.2 + Django REST Framework |
| **Database**          | SQLite                             |
| **Authentication**    | JWT (JSON Web Token)               |
| **API Documentation** | Swagger/OpenAPI (drf-spectacular)  |

## 🚀 주요 기능

### 📝 문의 관리 시스템

- **문의 등록**: 사용자 문의 접수 및 Slack 알림
- **관리자 답변**: 답변 작성 및 이메일 자동 발송
- **문의 이력**: 전체 문의 내역 조회 및 관리

### 💼 채용 정보 관리

- **채용 공고**: AI 관련 직무 정보 등록 및 관리
- **논리 삭제**: 채용 공고 마감 시 안전한 삭제 처리

### 📧 뉴스레터 시스템

- **구독자 관리**: 이메일 구독 신청 및 목록 관리
- **뉴스레터 발송**: 제목, 내용, 첨부파일 포함 발송
- **템플릿 관리**: 자주 사용하는 내용 저장 및 재사용
- **발송 이력**: 발송 내역 및 결과 추적

### 🔐 관리자 인증

- **JWT 인증**: 보안 로그인 시스템
- **권한 관리**: 기능별 접근 제어

## 📁 프로젝트 구조

```
backend/
├── leanai/                 # Django 프로젝트 설정
│   ├── settings.py        # 프로젝트 설정
│   ├── urls.py            # 메인 URL 설정
│   └── wsgi.py            # WSGI 설정
├── management/             # 문의 및 채용 관리 앱
│   ├── models.py          # 데이터 모델
│   ├── views.py           # API 뷰
│   ├── serializers.py     # 데이터 직렬화
│   ├── urls.py            # URL 라우팅
│   └── utils.py           # 유틸리티 함수
├── newsletter/             # 뉴스레터 관리 앱
│   ├── models.py          # 데이터 모델
│   ├── views.py           # API 뷰
│   ├── serializers.py     # 데이터 직렬화
│   └── urls.py            # URL 라우팅
├── requirements.txt        # Python 의존성
└── manage.py              # Django 관리 명령어
```

## 🛠️ 설치 및 실행

### 환경 요구사항

- Python 3.13+
- pip

### 설치 과정

```bash
# 저장소 클론
git clone https://github.com/your-username/Lean-AI.git
cd Lean-AI/backend

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate  # Windows

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env
# .env 파일에 실제 값 설정

# 데이터베이스 마이그레이션
python manage.py migrate

# 슈퍼유저 생성
python manage.py createsuperuser

# 기본 데이터 로드 (템플릿, 샘플 구독자 등)
python manage.py loaddata newsletter/fixtures/default_data.json

# 개발 서버 실행
python manage.py runserver
```

### 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 실제 값으로 설정하세요:

```env
# Django 설정
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True

# 데이터베이스 설정
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=your_database_name.sqlite3

# 이메일 설정 (Gmail)
GMAIL_APP_PASSWORD=your-gmail-app-password
GMAIL_ACCOUNT=your-email@gmail.com

# Slack 웹훅
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

**⚠️ 중요**: `.env` 파일은 민감한 정보를 포함하므로 절대 Git에 커밋하지 마세요!

## 📚 API 문서

| 도구               | URL                                 | 설명                            |
| ------------------ | ----------------------------------- | ------------------------------- |
| **Swagger UI**     | `http://localhost:8000/api/docs/`   | 인터랙티브한 API 문서 및 테스트 |
| **ReDoc**          | `http://localhost:8000/api/redoc/`  | 깔끔한 API 문서 뷰어            |
| **OpenAPI 스키마** | `http://localhost:8000/api/schema/` | OpenAPI 3.0 스키마 JSON         |

## 🔌 API 엔드포인트

### 문의 관련

- `POST /api/inquiry/` - 문의 등록
- `GET /api/inquiry/admin/` - 관리자용 문의 목록
- `PATCH /api/inquiry/admin/<pk>/` - 문의 답변 작성

### 채용 관련

- `GET /api/recruit/` - 채용 정보 목록
- `POST /api/recruit/` - 채용 정보 등록
- `GET /api/recruit/<pk>/` - 채용 정보 상세
- `PUT /api/recruit/<pk>/` - 채용 정보 수정
- `DELETE /api/recruit/<pk>/` - 채용 정보 삭제

### 뉴스레터 관련

- `GET /api/newsletter/email-subscribers/` - 구독자 목록
- `POST /api/newsletter/email-subscribers/` - 구독 신청
- `POST /api/newsletter/newsletter-logs/` - 뉴스레터 발송
- `GET /api/newsletter/newsletter-templates/` - 템플릿 목록

### 인증

- `POST /api/newsletter/admin/login/` - 관리자 로그인

## 🔐 인증 및 권한

### JWT 토큰 설정

- **Access Token**: 24시간 유효
- **Refresh Token**: 1일 유효
- **토큰 회전**: 자동 갱신 지원

### 권한 레벨

- **공개 API**: 문의 등록, 구독 신청, 채용 정보 조회
- **인증 필요**: 채용 정보 관리, 뉴스레터 발송
- **관리자 전용**: 문의 답변, 구독자 관리
