import { Check, User, Layers, MessageSquare, ArrowLeft, Send } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

// 3단계: 확인 및 제출
export default function StepThree({ 
  formData, 
  serviceTypeInfo,
  submitting,
  handleChange, 
  handleSubmit,
  prevStep
}) {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <Check className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            문의 내용 확인
          </h2>
          <p className="text-gray-500 text-sm">
            입력하신 내용을 확인하세요
          </p>
        </div>
      </div>

      <div className="flex-grow" style={{ minHeight: "240px" }}>
        <div className="bg-blue-50 rounded-2xl shadow-sm px-5 py-3 border border-gray-100 h-full">
          <div className="space-y-5 h-full flex flex-col">
            {/* 고객 정보 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center border-b border-gray-100">
                <User className="h-4 w-4 text-sky-500 mr-3" />
                <span className="text-gray-500 font-medium">
                  고객 정보
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm bg-white rounded-lg p-3">
                <div>
                  <p className="text-gray-500 mb-1 text-xs">
                    이름
                  </p>
                  <p className="font-medium text-gray-700">
                    {formData.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs">
                    이메일
                  </p>
                  <p className="font-medium text-gray-700">
                    {formData.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs">
                    회사/기관명
                  </p>
                  <p className="font-medium text-gray-700">
                    {formData.company || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs">
                    전화번호
                  </p>
                  <p className="font-medium text-gray-700">
                    {formData.phone || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* 문의 서비스 정보 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center border-b border-gray-100">
                <Layers className="h-4 w-4 text-sky-500 mr-3" />
                <span className="text-gray-500 font-medium">
                  서비스 정보
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm bg-white rounded-lg p-3">
                <div>
                  <p className="text-gray-500 mb-1 text-xs">
                    서비스 유형
                  </p>
                  <p className="font-medium text-gray-700">
                    {formData.serviceType &&
                      serviceTypeInfo[formData.serviceType].title}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs">
                    관심 기능
                  </p>
                  <p className="font-medium text-gray-700">
                    {formData.interest}
                  </p>
                </div>
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center border-b border-gray-100">
                <MessageSquare className="h-4 w-4 text-sky-500 mr-3" />
                <span className="text-gray-500 font-medium">
                  문의 내용
                </span>
              </div>

              <div className="bg-white rounded-lg p-3 text-gray-700 text-sm flex-grow overflow-y-auto max-h-48">
                {formData.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-start gap-3 bg-sky-50 p-4 rounded-xl border border-sky-100 mb-4">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-sky-300 text-sky-600 focus:ring-sky-500"
          />
          <div>
            <label
              htmlFor="agree"
              className="block text-gray-800 font-medium text-sm"
            >
              개인정보 수집 및 이용에 동의합니다
            </label>
            <p className="text-xs text-gray-500 mt-1">
              수집된 개인정보는 문의 답변 목적으로만 이용되며,
              문의 처리 완료 후 즉시 파기됩니다.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>이전</span>
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || !formData.agree}
            className={`${
              formData.agree
                ? "bg-blue-400 hover:bg-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-medium px-8 py-3 rounded-xl shadow-md hover:shadow-lg flex items-center transition-all disabled:opacity-70 group`}
          >
            {submitting ? (
              <>
                <Spinner
                  size={16}
                  color="text-white"
                  className="mr-2"
                />
                <span className="ml-2">제출 중...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                문의하기
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}