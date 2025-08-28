import { AlertCircle } from "lucide-react";

export default function InputField({
  name,         // 인풋의 name 속성
  label,        // 라벨 텍스트
  type = "text", // 인풋 타입 (기본값: text)
  placeholder,  // placeholder 텍스트
  icon: Icon,   // 좌측에 표시할 아이콘 컴포넌트
  required = false, // 필수 입력 여부
  disabled = false, // 비활성화 여부
  maxLength,    // 최대 입력 길이
  value,        // 현재 입력값
  onChange,     // onChange 핸들러
  onBlur,       // onBlur 핸들러 (포커스 아웃 시)
  error,        // 유효성 오류 메시지
  touched       // 해당 필드가 터치되었는지 여부
}) {
  const hasError = touched && error; // 터치 후 오류가 있을 때만 표시

  return (
    <div className="group">
      {/* 라벨 및 오류 메시지 표시 */}
      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-sky-600 flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {hasError && (
          <span className="ml-auto text-xs text-red-500 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {error}
          </span>
        )}
      </label>

      {/* 인풋 필드 영역 */}
      <div className="relative">
        {/* 좌측 아이콘 */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Icon
            className={`h-5 w-5 ${
              hasError
                ? "text-red-500" // 오류 시 빨간색
                : "text-gray-400 group-focus-within:text-sky-500" // 포커스 시 파란색
            }`}
          />
        </div>

        {/* 실제 input 필드 */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={maxLength}
          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
            hasError
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-sky-200"
          } rounded-xl focus:ring-2 focus:bg-white outline-none transition-all`}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
