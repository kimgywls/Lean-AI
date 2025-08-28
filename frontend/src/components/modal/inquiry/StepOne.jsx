import { User, Mail, Building, Phone, ArrowRight } from "lucide-react";
import InputField from "./InputField";

// 1단계: 기본 정보 입력
export default function StepOne({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur,
  nextStep,
}) {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
          <User className="w-5 h-5 text-cyan-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            LEAN-AI에게 문의하기
          </h2>
          <p className="text-gray-500 text-sm">기본 정보를 입력해주세요</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <InputField
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          icon={User}
          required={true}
          maxLength={30}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
        />

        <InputField
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          icon={Mail}
          required={true}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
        />

        <InputField
          name="company"
          label="회사/기관명"
          placeholder="회사/기관명"
          icon={Building}
          maxLength={50}
          value={formData.company}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.company}
          touched={touched.company}
        />

        <InputField
          name="phone"
          label="전화번호"
          placeholder="010-0000-0000"
          icon={Phone}
          required={true}
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:shadow-lg flex items-center transition-all group"
        >
          <span>다음 단계</span>
          <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
