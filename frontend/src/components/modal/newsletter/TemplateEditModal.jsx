"use client";

import { useMemo, useState } from "react";
import {
  X,
  Save,
  PencilLine,
  CirclePlus,
  Sparkles,
  ChevronDown,
  Calendar,
  Tag,
  Building,
  User,
  Phone,
} from "lucide-react";

export default function TemplateEditModal({
  isOpen,               // 모달 오픈 여부
  onClose,              // 모달 닫기 함수
  currentTemplate,      // 현재 템플릿 객체
  setCurrentTemplate,   // 템플릿 수정 함수
  isEditing,            // 수정 모드 여부
  onSave,               // 저장 버튼 클릭 시 실행할 함수
  selectedDate,         // 선택된 날짜
  selectedSolution,     // 선택된 솔루션명
}) {
  const [variableMenuOpen, setVariableMenuOpen] = useState(false); // 변수 삽입 드롭다운 상태

  // 날짜를 한글 날짜 형식으로 포맷
  const formatSelectedDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 요일을 한글로 포맷
  const formatSelectedDay = (date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "long" });
  };

  // 변수명에 대한 실제 값 정의
  const variableValues = useMemo(
    () => ({
      날짜: formatSelectedDate(selectedDate),
      요일: formatSelectedDay(selectedDate),
      솔루션명: selectedSolution,
      회사명: "린에이아이",
      담당자: "정찬혁",
      연락처: "010-1234-5678",
    }),
    [selectedDate, selectedSolution]
  );

  // 변수별 아이콘 지정
  const variableIcons = {
    날짜: <Calendar className="h-3.5 w-3.5" />,
    요일: <Calendar className="h-3.5 w-3.5" />,
    솔루션명: <Tag className="h-3.5 w-3.5" />,
    회사명: <Building className="h-3.5 w-3.5" />,
    담당자: <User className="h-3.5 w-3.5" />,
    연락처: <Phone className="h-3.5 w-3.5" />,
  };

  // 변수 카테고리 구성
  const variableCategories = [
    {
      name: "날짜 정보",
      color: "sky",
      variables: ["날짜", "요일"],
    },
    {
      name: "서비스 정보",
      color: "blue",
      variables: ["솔루션명", "회사명"],
    },
    {
      name: "고객 정보",
      color: "indigo",
      variables: ["담당자", "연락처"],
    },
  ];

  // 선택한 위치에 변수 삽입 함수
  const insertVariable = (key) => {
    const textarea = document.getElementById("template-content");
    const value = `[${key}]`;

    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const currentContent = currentTemplate.content;
      const newContent =
        currentContent.substring(0, startPos) +
        value +
        currentContent.substring(endPos);

      setCurrentTemplate({
        ...currentTemplate,
        content: newContent,
      });

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          startPos + value.length,
          startPos + value.length
        );
      }, 0);
    }
  };

  // 모달이 열려있지 않으면 렌더링 안함
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose} // 바깥 영역 클릭 시 모달 닫힘
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
      >
        {/* 상단 헤더 */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-sky-50">
          <h3 className="flex items-center text-lg font-bold text-sky-600">
            {isEditing ? (
              <PencilLine className="h-5 w-5 mr-2" />
            ) : (
              <CirclePlus className="h-5 w-5 mr-2" />
            )}
            {isEditing ? "템플릿 수정" : "새 템플릿 생성"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6">
          {/* 제목 입력 필드 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              템플릿 제목
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              placeholder="예: 월간 소식지 템플릿"
              value={currentTemplate.title}
              onChange={(e) =>
                setCurrentTemplate({
                  ...currentTemplate,
                  title: e.target.value,
                })
              }
            />
          </div>

          {/* 내용 입력 필드 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                템플릿 내용
              </label>

              {/* 변수 삽입 버튼 */}
              <div className="relative">
                <button
                  onClick={() => setVariableMenuOpen(!variableMenuOpen)}
                  className="flex items-center text-sm text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-md"
                >
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  변수 삽입
                  <ChevronDown
                    className={`h-4 w-4 ml-1.5 transition-transform ${
                      variableMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 드롭다운 메뉴 */}
                {variableMenuOpen && (
                  <div className="absolute right-0 mt-1 w-72 bg-white rounded-lg shadow-lg border border-sky-100 z-10 overflow-hidden">
                    <div className="p-3 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
                      <h4 className="text-sm font-medium text-sky-700">
                        변수를 선택하여 템플릿에 삽입
                      </h4>
                      <p className="text-xs text-sky-600 mt-1">
                        뉴스레터 발송 시 자동으로 치환됩니다
                      </p>
                    </div>
                    <div className="max-h-80 overflow-y-auto p-2">
                      {/* 카테고리별 변수 표시 */}
                      {variableCategories.map((cat, idx) => (
                        <div key={idx} className="mb-2">
                          <div
                            className={`text-xs font-semibold text-${cat.color}-700 bg-${cat.color}-50 px-3 py-1.5 rounded-md mb-1.5`}
                          >
                            {cat.name}
                          </div>
                          <div className="grid grid-cols-1 gap-1 pl-2">
                            {cat.variables.map((v) => (
                              <button
                                key={v}
                                onClick={() => {
                                  insertVariable(v);
                                  setVariableMenuOpen(false);
                                }}
                                className="flex items-center justify-between text-sm text-gray-700 hover:text-sky-700 hover:bg-sky-50 px-3 py-2 rounded-md text-left"
                              >
                                <div className="flex items-center">
                                  <span
                                    className={`inline-flex items-center justify-center h-6 w-6 rounded-full bg-${cat.color}-100 text-${cat.color}-600 mr-2`}
                                  >
                                    {variableIcons[v]}
                                  </span>
                                  <span>[{v}]</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {variableValues[v]}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* 닫기 버튼 */}
                    <div className="p-2 border-t border-sky-100 bg-sky-50">
                      <button
                        onClick={() => setVariableMenuOpen(false)}
                        className="w-full text-center text-sm text-sky-600 hover:text-sky-700 py-1.5"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 템플릿 내용 입력 */}
            <textarea
              id="template-content"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-64 focus:ring-2 focus:ring-sky-500"
              placeholder="뉴스레터 내용을 작성하세요..."
              value={currentTemplate.content}
              onChange={(e) =>
                setCurrentTemplate({
                  ...currentTemplate,
                  content: e.target.value,
                })
              }
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={onSave}
              className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg flex items-center"
            >
              <Save className="h-4 w-4 mr-2" /> 저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
