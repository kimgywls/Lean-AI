import { MessageSquare, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import ServiceTypeCard from "./ServiceTypeCard";

// 2단계: 서비스 유형, 관심 기능, 문의 내용
export default function StepTwo({ 
  formData, 
  errors, 
  touched, 
  interestOptions, 
  serviceTypeInfo,
  handleChange, 
  handleBlur,
  handleServiceTypeSelect,
  prevStep, 
  nextStep 
}) {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mr-4">
          <MessageSquare className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            어떤 문의가 있으신가요?
          </h2>
          <p className="text-gray-500 text-sm">
            서비스 유형과 관심 기능을 선택해주세요
          </p>
        </div>
      </div>

      <div className="space-y-5 flex-grow">
        {/* 서비스 타입 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            서비스 유형 
            <span className="text-red-500 ml-1">*</span>
            {touched.serviceType && errors.serviceType && (
              <span className="ml-auto text-xs text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.serviceType}
              </span>
            )}
          </label>
          <div className="grid grid-cols-3 gap-3">
            <ServiceTypeCard
              type="leanai"
              selected={formData.serviceType === "leanai"}
              onClick={handleServiceTypeSelect}
              serviceTypeInfo={serviceTypeInfo}
            />
            <ServiceTypeCard
              type="mumul"
              selected={formData.serviceType === "mumul"}
              onClick={handleServiceTypeSelect}
              serviceTypeInfo={serviceTypeInfo}
            />
            <ServiceTypeCard
              type="other"
              selected={formData.serviceType === "other"}
              onClick={handleServiceTypeSelect}
              serviceTypeInfo={serviceTypeInfo}
            />
          </div>
          {formData.serviceType && (
            <div className="mt-2 text-xs flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  formData.serviceType === "leanai"
                    ? "bg-cyan-500"
                    : formData.serviceType === "mumul"
                      ? "bg-violet-500"
                      : "bg-amber-500"
                }`}
              ></div>
              <span className="text-gray-500">
                {formData.serviceType === "leanai"
                  ? "데이터 가공 및 AI 컨설팅 서비스"
                  : formData.serviceType === "mumul"
                    ? "고객 응대 및 문서 기반 챗봇 서비스"
                    : "그 외 모든 문의 사항"}
                에 대한 문의를 작성합니다.
              </span>
            </div>
          )}
        </div>

        {/* 관심 서비스 선택 */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-sky-600 flex items-center">
            관심 있는 기능
            <span className="text-red-500 ml-1">*</span>
            {touched.interest && errors.interest && (
              <span className="ml-auto text-xs text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.interest}
              </span>
            )}
          </label>
          <div className="relative">
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border ${
                touched.interest && errors.interest
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-sky-200"
              } rounded-xl focus:ring-2 focus:bg-white transition-all outline-none appearance-none ${!formData.serviceType ? "bg-gray-100 text-gray-400" : ""}`}
              required
              disabled={!formData.serviceType}
            >
              <option value="">기능을 선택해주세요</option>
              {formData.serviceType &&
                interestOptions[formData.serviceType]?.map(
                  (item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  )
                )}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
            </div>
          </div>
          {!formData.serviceType && (
            <p className="text-xs text-blue-500 mt-1">
              * 서비스 유형을 먼저 선택해주세요
            </p>
          )}
        </div>

        {/* 문의 내용 */}
        <div className="group flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-sky-600 flex items-center">
            문의 내용
            <span className="text-red-500 ml-1">*</span>
            {touched.message && errors.message && (
              <span className="ml-auto text-xs text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.message}
              </span>
            )}
          </label>
          <div className="relative flex-grow">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <MessageSquare className={`h-5 w-5 ${
                touched.message && errors.message
                  ? "text-red-500"
                  : "text-gray-400 group-focus-within:text-sky-500"
              }`} />
            </div>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={1000}
              className={`w-full h-32 pl-10 pr-4 py-3 border ${
                touched.message && errors.message
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-sky-200"
              } rounded-xl focus:ring-2 bg-gray-50 focus:bg-white transition-all resize-none outline-none`}
              placeholder="문의 내용을 자세히 입력해주세요 (10~1000자)"
              required
            />
          </div>
          <div className="flex justify-between mt-1">
            {touched.message && errors.message ? (
              <div></div>
            ) : (
              <div className="text-xs text-gray-400">
                10자 이상 입력해주세요
              </div>
            )}
            <div className="text-xs text-gray-400">
              {formData.message.length}/1000자
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center transition-all"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>이전</span>
        </button>
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