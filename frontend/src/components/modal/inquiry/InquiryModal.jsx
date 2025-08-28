"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  X,
  Check,
  Layers,
  MessageSquare,
  CircleHelp,
  AlertTriangle,
} from "lucide-react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

// 관심 기능 옵션: 서비스 타입에 따라 분기
const interestOptions = {
  leanai: [
    "데이터 수집",
    "데이터 가공",
    "AI 바우처 컨설팅",
    "크라우드소싱 협업",
    "프로젝트 위탁",
    "기타",
  ],
  mumul: [
    "FAQ 자동 응답",
    "고객 CS 챗봇",
    "문서 기반 QnA",
    "사내 지식 챗봇",
    "민원 응대 챗봇",
    "기타",
  ],
  other: ["서비스 제안", "기술 문의", "제휴 문의", "채용 문의", "기타"],
};

// 서비스 정보 (UI에 사용될 색상, 아이콘 등 포함)
const serviceTypeInfo = {
  leanai: {
    title: "LeanAI",
    description: "데이터 가공 및 AI 컨설팅 서비스",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    icon: Layers,
  },
  mumul: {
    title: "Mumul",
    description: "고객 응대 및 문서 기반 챗봇 서비스",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    icon: MessageSquare,
  },
  other: {
    title: "기타 문의",
    description: "그 외 모든 문의 사항",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: CircleHelp,
  },
};

// 에러 메시지 컴포넌트
const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="animate-fadeIn bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start mb-4">
      <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{message}</div>
    </div>
  );
};

export default function InquiryModal({ isOpen, onClose, onSubmit }) {
  // 입력 데이터 상태
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    interest: "",
    message: "",
    agree: false,
  });

  const [step, setStep] = useState(1); // 현재 단계
  const [submitting, setSubmitting] = useState(false); // 전송 중 여부
  const [complete, setComplete] = useState(false); // 전송 완료 여부
  const [animation, setAnimation] = useState(""); // 슬라이드 애니메이션
  const [globalError, setGlobalError] = useState(""); // 전역 에러 메시지
  const [modalHeight, setModalHeight] = useState(0); // 반응형 모달 높이 설정
  // 각 필드별 에러 관리
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    interest: "",
    message: "",
  });

  // 터치 상태 관리
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    serviceType: false,
    interest: false,
    message: false,
  });

  // 에러 메시지 초기화
  const clearGlobalError = () => {
    setGlobalError("");
  };

  // 반응형 높이 설정
  useEffect(() => {
    if (isOpen) {
      const updateModalHeight = () => {
        const viewportHeight = window.innerHeight;
        // 화면 높이에서 상하 마진(my-4)을 고려한 높이 계산
        const availableHeight = viewportHeight - 32; // my-4는 각각 16px, 총 32px
        setModalHeight(availableHeight);
      };

      updateModalHeight();
      window.addEventListener("resize", updateModalHeight);

      return () => {
        window.removeEventListener("resize", updateModalHeight);
      };
    }
  }, [isOpen]);

  // 단계 변경 시 에러 메시지 초기화
  useEffect(() => {
    clearGlobalError();
  }, [step]);

  // 입력값 변경 감지 및 실시간 유효성 검증
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 필드에 입력 시작되면 touched 상태 업데이트
    if (!touched[name]) {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    }

    // 전화번호 자동 하이픈 적용
    let processedValue = value;
    if (name === "phone") {
      // 숫자만 추출
      const digitOnly = value.replace(/\D/g, "");

      // 자동 하이픈 포맷팅
      if (digitOnly.length <= 3) {
        processedValue = digitOnly;
      } else if (digitOnly.length <= 7) {
        processedValue = `${digitOnly.slice(0, 3)}-${digitOnly.slice(3)}`;
      } else {
        processedValue = `${digitOnly.slice(0, 3)}-${digitOnly.slice(3, 7)}-${digitOnly.slice(7, 11)}`;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));

    // 서비스 타입 변경 시 관심 옵션 초기화
    if (name === "serviceType") {
      setFormData((prev) => ({
        ...prev,
        interest: "",
      }));

      setTouched((prev) => ({
        ...prev,
        serviceType: true,
      }));

      validateField("serviceType", value);
    }

    // 입력값 변경 후 실시간 유효성 검증
    if (touched[name]) {
      validateField(name, type === "checkbox" ? checked : processedValue);
    }

    // 에러 발생 시 수정하면 전역 에러 메시지 초기화
    if (globalError) {
      clearGlobalError();
    }
  };

  // 서비스 타입 선택 핸들러
  const handleServiceTypeSelect = (type) => {
    handleChange({ target: { name: "serviceType", value: type } });
  };

  // 유효성 검증 함수
  const validateField = useCallback((name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "이름을 입력해주세요";
        } else if (value.trim().length < 2) {
          error = "이름은 2자 이상 입력해주세요";
        } else if (value.trim().length > 30) {
          error = "이름은 30자 이내로 입력해주세요";
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = "이름에 특수문자를 사용할 수 없습니다";
        }
        break;

      case "email":
        // 더 강력한 이메일 정규식 (한글 제외)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) {
          error = "이메일을 입력해주세요";
        } else if (!emailRegex.test(value)) {
          error = "유효한 이메일 주소를 입력해주세요";
        }
        break;

      case "phone":
        const phoneDigits = value.replace(/\D/g, "");
        // 한국 전화번호 패턴 (01X-XXXX-XXXX 또는 지역번호)
        const mobileRegex = /^01([0|1|6|7|8|9])(\d{3,4})(\d{4})$/;
        const landlineRegex = /^0([2|3|4|5|6|7])(\d{3,4})(\d{4})$/;

        if (value && !phoneDigits) {
          error = "전화번호는 숫자만 입력 가능합니다";
        } else if (value && phoneDigits.length < 9) {
          error = "전화번호가 너무 짧습니다";
        } else if (value && phoneDigits.length > 11) {
          error = "전화번호가 너무 깁니다";
        } else if (
          value &&
          !(mobileRegex.test(phoneDigits) || landlineRegex.test(phoneDigits))
        ) {
          error = "유효한 전화번호 형식이 아닙니다";
        }
        break;

      case "company":
        if (value && value.trim().length > 50) {
          error = "회사/기관명은 50자 이내로 입력해주세요";
        }
        break;

      case "serviceType":
        if (!value) {
          error = "서비스 유형을 선택해주세요";
        }
        break;

      case "interest":
        if (!value) {
          error = "관심 있는 기능을 선택해주세요";
        }
        break;

      case "message":
        if (!value.trim()) {
          error = "문의 내용을 입력해주세요";
        } else if (value.trim().length < 10) {
          error = "문의 내용은 10자 이상 입력해주세요";
        } else if (value.trim().length > 1000) {
          error = "문의 내용은 1000자 이내로 입력해주세요";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return !error;
  }, []);

  // 입력 필드 떠날 때 유효성 검증
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  // 현재 단계의 모든 필드 유효성 검증
  const validateStep = (currentStep) => {
    let isValid = true;
    let errorFields = [];

    // 현재 단계에 따른 필드 그룹 선택
    const fieldsToValidate =
      currentStep === 1
        ? ["name", "email", "phone"]
        : ["serviceType", "interest", "message"];

    // 각 필드 유효성 검증 및 touched 상태 업데이트
    fieldsToValidate.forEach((field) => {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));
      const fieldValid = validateField(field, formData[field]);
      if (!fieldValid) {
        isValid = false;
        errorFields.push(field);
      }
    });

    // 유효하지 않으면 전역 에러 메시지 설정
    if (!isValid) {
      if (currentStep === 1) {
        setGlobalError("필수 정보를 올바르게 입력해주세요.");
      } else {
        setGlobalError(
          "서비스 유형, 관심 기능 및 문의 내용을 올바르게 입력해주세요."
        );
      }

      // 첫 번째 에러 필드로 스크롤
      if (errorFields.length > 0) {
        const firstErrorField = document.querySelector(
          `[name="${errorFields[0]}"]`
        );
        if (firstErrorField) {
          setTimeout(() => {
            firstErrorField.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
        }
      }
    }

    return isValid;
  };

  // 모든 필드 유효성 검증
  const validateAll = () => {
    const fields = [
      "name",
      "email",
      "phone",
      "serviceType",
      "interest",
      "message",
    ];
    let isValid = true;
    let errorFields = [];

    fields.forEach((field) => {
      const fieldValid = validateField(field, formData[field]);
      if (!fieldValid) {
        isValid = false;
        errorFields.push(field);
      }
    });

    if (!isValid) {
      setGlobalError("필수 정보를 올바르게 입력해주세요.");

      // 첫 번째 에러 필드로 스크롤
      if (errorFields.length > 0) {
        const firstErrorField = document.querySelector(
          `[name="${errorFields[0]}"]`
        );
        if (firstErrorField) {
          setTimeout(() => {
            firstErrorField.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
        }
      }
    }

    return isValid;
  };

  // 단계 전환 시 애니메이션 효과
  const changeStep = (newStep) => {
    if (newStep > step) {
      setAnimation("slide-left");
    } else {
      setAnimation("slide-right");
    }

    setTimeout(() => {
      setStep(newStep);
      setAnimation("");
    }, 300);
  };

  const nextStep = () => {
    if (step === 1) {
      // 1단계 필드 유효성 검증
      if (!validateStep(1)) {
        return;
      }
    }

    if (step === 2) {
      // 2단계 필드 유효성 검증
      if (!validateStep(2)) {
        return;
      }
    }

    changeStep(step + 1);
  };

  const prevStep = () => {
    changeStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      setGlobalError("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    if (!validateAll()) return;

    setSubmitting(true);

    try {
      // 백엔드에 데이터 전송
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/inquiry/`,
        formData,
        {
          headers: {
            Authorization: undefined,
            "Content-Type": "application/json",
          },
        }
      );

      if (onSubmit) await onSubmit(formData);
      setComplete(true);
    } catch (error) {
      console.error("문의 제출 중 오류가 발생했습니다:", error);
      setGlobalError("문의 제출 중 오류가 발생했습니다. \n다시 시도해주세요.");
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setComplete(false);
    setSubmitting(false);
    setFormData({
      company: "",
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      interest: "",
      message: "",
      agree: false,
    });
    setTouched({
      name: false,
      email: false,
      phone: false,
      company: false,
      serviceType: false,
      interest: false,
      message: false,
    });
    setGlobalError("");
    onClose();
  };

  if (!isOpen && !complete) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div
        className="w-full max-w-[90%] md:max-w-lg mx-auto my-4 flex flex-col"
        style={{
          maxHeight: modalHeight ? `${modalHeight}px` : "calc(100vh - 32px)",
        }}
      >
        <div className="bg-white relative overflow-hidden rounded-3xl shadow-2xl flex flex-col flex-grow">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10 bg-white/80 rounded-full p-2 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 진행 상태 표시 */}
          {!complete && (
            <div className="w-full bg-gray-100 h-1.5 relative">
              <div
                className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-500 absolute top-0 left-0"
                style={{ width: `${step * (100 / 3)}%` }}
              ></div>
              <div className="absolute top-0 left-0 w-full flex justify-between px-10 -mt-0.5">
                <div
                  className={`w-2 h-6 rounded-full flex items-center justify-center transition-all ${
                    step >= 1
                      ? "bg-sky-300 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                ></div>
                <div
                  className={`w-2 h-6 rounded-full flex items-center justify-center transition-all ${
                    step >= 2
                      ? "bg-sky-400 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                ></div>
                <div
                  className={`w-2 h-6 rounded-full flex items-center justify-center transition-all ${
                    step >= 3
                      ? "bg-sky-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                ></div>
              </div>
            </div>
          )}

          <div className="p-8 flex-grow flex flex-col overflow-y-auto">
            {/* 전역 에러 메시지 */}
            <ErrorMessage message={globalError} onDismiss={clearGlobalError} />

            {complete ? (
              <InquirySuccessModal
                email={formData.email}
                onClose={handleClose}
              />
            ) : (
              <div
                className={`flex flex-col flex-grow transform transition-all duration-300 ${animation === "slide-left" ? "-translate-x-full opacity-0" : animation === "slide-right" ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
              >
                {step === 1 && (
                  <StepOne
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    nextStep={nextStep}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    interestOptions={interestOptions}
                    serviceTypeInfo={serviceTypeInfo}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleServiceTypeSelect={handleServiceTypeSelect}
                    prevStep={prevStep}
                    nextStep={nextStep}
                  />
                )}

                {step === 3 && (
                  <StepThree
                    formData={formData}
                    serviceTypeInfo={serviceTypeInfo}
                    submitting={submitting}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    prevStep={prevStep}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
