import { Check } from "lucide-react";

// 서비스 타입 카드 컴포넌트
export default function ServiceTypeCard({ type, selected, onClick, serviceTypeInfo }) {
  const info = serviceTypeInfo[type]; // 해당 서비스 유형의 정보 (타이틀, 아이콘 등)
  const Icon = info.icon;

  // 선택 여부 및 유형에 따른 스타일 정의
  const styles = {
    leanai: {
      selectedBg: "bg-gradient-to-br from-cyan-50 to-blue-50", // 선택 시 배경
      border: selected
        ? "border-cyan-500" // 선택된 경우 테두리
        : "border-gray-200 hover:border-cyan-300", // 기본 or hover
      shadow: selected ? "shadow-cyan-100" : "", // 그림자
      checkBg: "bg-gradient-to-r from-cyan-500 to-blue-500", // 체크 아이콘 배경
    },
    mumul: {
      selectedBg: "bg-gradient-to-br from-violet-50 to-purple-50",
      border: selected
        ? "border-violet-500"
        : "border-gray-200 hover:border-violet-300",
      shadow: selected ? "shadow-violet-100" : "",
      checkBg: "bg-gradient-to-r from-violet-500 to-purple-500",
    },
    other: {
      selectedBg: "bg-gradient-to-br from-amber-50 to-orange-50",
      border: selected
        ? "border-amber-500"
        : "border-gray-200 hover:border-amber-300",
      shadow: selected ? "shadow-amber-100" : "",
      checkBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
  };

  const currentStyle = styles[type]; // 현재 카드에 적용할 스타일

  return (
    <div
      className={`relative border-2 rounded-xl cursor-pointer transition-all duration-200 ${
        selected
          ? `${currentStyle.selectedBg} ${currentStyle.border} shadow-lg ${currentStyle.shadow}`
          : `${currentStyle.border} hover:shadow-md bg-white`
      }`}
      onClick={() => onClick(type)} // 클릭 시 서비스 유형 선택 콜백 호출
    >
      <div className="p-4">
        {/* 아이콘 및 제목 표시 */}
        <div className="flex flex-col items-center justify-center text-center gap-3">
          {/* 아이콘 원형 배경 */}
          <div
            className={`w-10 h-10 rounded-full ${info.bgColor} flex items-center justify-center transition-transform ${selected ? "scale-110" : ""}`}
          >
            <Icon className={`w-6 h-6 ${info.iconColor}`} />
          </div>

          {/* 서비스 이름 */}
          <div>
            <h3
              className={`font-bold text-gray-800 transition-colors ${selected ? "text-gray-900" : ""}`}
            >
              {info.title}
            </h3>
          </div>
        </div>
      </div>

      {/* 선택되었을 경우 체크 아이콘 표시 */}
      {selected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md z-10">
          <div
            className={`w-full h-full rounded-full ${currentStyle.checkBg} flex items-center justify-center`}
          >
            <Check className="w-3 h-3 text-white" />
          </div>
        </div>
      )}

      {/* 선택 표시용 하단 바 */}
      {selected && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 ${currentStyle.checkBg} rounded-b-xl`}
        ></div>
      )}
    </div>
  );
}
