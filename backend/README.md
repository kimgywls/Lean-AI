# Lean-AI Backend

> Lean-AI는 기업 고객을 위한 AI 솔루션 및 정부 지원 사업(데이터/AI 바우처 등) 안내를 목적으로 만들어진 웹 서비스입니다.

## 📋 프로젝트 개요

Lean-AI는 AI 솔루션을 도입하고자 하는 기업들을 위한 종합적인 웹 서비스로, 랜딩 페이지를 중심으로 기업 소개, 서비스 안내, 뉴스룸 및 관리자 기능으로 구성되어 있습니다.

## 🏗️ 아키텍처

- **Backend**: Django 5.2 + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **API Documentation**: Swagger/OpenAPI (drf-spectacular)
- **Deployment**: Render

## 🚀 주요 기능

### 1. 문의 관리 시스템
- **문의 등록**: 사용자가 회사 정보, 연락처, 문의 내용을 등록
- **Slack 알림**: 새 문의 접수 시 자동으로 Slack으로 알림 전송
- **관리자 답변**: 관리자가 문의에 대한 답변 작성 및 이메일 발송
- **문의 이력**: 모든 문의 내역 조회 및 관리

### 2. 채용 정보 관리
- **채용 공고 등록**: AI 관련 직무 정보 등록
- **채용 정보 조회**: 등록된 채용 정보 목록 및 상세 내용 조회
- **논리 삭제**: 채용 공고 마감 시 논리적 삭제 처리

### 3. 뉴스레터 시스템
- **구독자 관리**: 이메일 구독 신청 및 구독자 목록 관리
- **뉴스레터 발송**: 제목, 내용, 첨부파일을 포함한 뉴스레터 발송
- **템플릿 관리**: 자주 사용하는 뉴스레터 내용을 템플릿으로 저장
- **발송 이력**: 뉴스레터 발송 내역 및 결과 추적

### 4. 관리자 인증
- **JWT 인증**: 관리자 전용 로그인 시스템
- **권한 관리**: 관리자 권한에 따른 기능 접근 제어

## 📁 프로젝트 구조

```
backend/
├── leanai/                 # Django 프로젝트 설정
│   ├── settings.py        # 프로젝트 설정
│   ├── urls.py            # 메인 URL 설정
│   └── wsgi.py            # WSGI 설정
├── management/             # 문의 및 채용 관리 앱
│   ├── models.py          # 문의, 채용 모델
│   ├── views.py           # API 뷰
│   ├── serializers.py     # 데이터 직렬화
│   ├── urls.py            # URL 라우팅
│   └── utils.py           # 유틸리티 함수
├── newsletter/             # 뉴스레터 관리 앱
│   ├── models.py          # 구독자, 뉴스레터 모델
│   ├── views.py           # API 뷰
│   ├── serializers.py     # 데이터 직렬화
│   └── urls.py            # URL 라우팅
├── requirements.txt        # Python 의존성
└── manage.py              # Django 관리 명령어
```

## 🛠️ 설치 및 실행

### 1. 환경 요구사항
- Python 3.13+
- PostgreSQL 12+
- pip

### 2. 설치 과정

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
# .env 파일에 데이터베이스 정보 및 API 키 설정

# 데이터베이스 마이그레이션
python manage.py migrate

# 슈퍼유저 생성
python manage.py createsuperuser

# 개발 서버 실행
python manage.py runserver
```

### 3. 환경 변수 설정

`.env` 파일에 다음 정보를 설정하세요:

```env
# Django 설정
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True

# 데이터베이스 설정
DB_NAME=leanai_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# 이메일 설정 (Gmail)
GMAIL_ACCOUNT=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Slack 웹훅
SLACK_WEBHOOK_URL=your-slack-webhook-url
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
- **설명**: OpenAPI 3.0 스키마 JSON 파일

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

### JWT 토큰
- **Access Token**: 24시간 유효
- **Refresh Token**: 1일 유효
- **토큰 회전**: 자동 갱신 지원

### 권한 레벨
- **공개 API**: 문의 등록, 구독 신청, 채용 정보 조회
- **인증 필요**: 채용 정보 관리, 뉴스레터 발송
- **관리자 전용**: 문의 답변, 구독자 관리

## 🧪 테스트

```bash
# 테스트 실행
python manage.py test

# 특정 앱 테스트
python manage.py test management
python manage.py test newsletter
```

## 📦 배포

### Render 배포
1. Render 대시보드에서 새 Web Service 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포 활성화

### 환경 변수 (배포용)
```env
DEBUG=False
DJANGO_SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=your-domain.com
CORS_ALLOWED_ORIGINS=https://your-domain.com
```

## 🔗 관련 링크

- **프론트엔드**: [https://lean-ai.vercel.app](https://lean-ai.vercel.app/)
- **관리자 페이지**: [https://lean-ai.vercel.app/admin](https://lean-ai.vercel.app/admin)
- **API 문서**: `https://your-backend-domain.com/api/docs/`

## 👥 개발팀

- **Backend Developer**: [Your Name]
- **Frontend Developer**: [Frontend Developer Name]
- **Project Manager**: [PM Name]

## 📄 라이선스

이 프로젝트는 [라이선스명] 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 다음으로 연락해주세요:

- **Email**: [your-email@example.com]
- **GitHub Issues**: [GitHub Issues 페이지 링크]

---

**Lean-AI Backend** - AI 솔루션을 위한 강력한 백엔드 시스템 🚀
