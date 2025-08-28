import React from "react";
import {
  X,
  Check,
  Mail,
  Phone,
  Calendar,
  Clock,
  Building,
  Reply,
  User,
} from "lucide-react";

const InquiryDetailModal = ({
  inquiry,       // 선택된 문의 데이터
  isOpen,        // 모달 열림 여부
  onClose,       // 닫기 핸들러
  onReply,       // 답변하기 핸들러
  formatDate,    // 날짜 포맷 함수
}) => {
  // 모달이 닫힌 상태거나 데이터가 없으면 렌더링하지 않음
  if (!isOpen || !inquiry) return null;

  // 내부용 날짜+시간 포맷 함수
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* 모달 컨테이너 */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">

        {/* 모달 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
              <User className="h-4 w-4 text-sky-600" />
            </span>
            문의 상세 정보
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* 기본 정보 섹션 */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between mb-2">
              {/* 이름과 답변 여부 뱃지 */}
              <div className="flex items-center mb-2 mr-4">
                <h4 className="font-bold text-gray-800 text-lg mr-3">
                  {inquiry.name}
                </h4>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    inquiry.replied
                      ? "bg-sky-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {inquiry.replied ? "답변완료" : "미답변"}
                </span>
              </div>

              {/* 날짜 및 시간 표시 */}
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(inquiry.created_at)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(inquiry.created_at).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {/* 이메일 / 연락처 / 회사 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">이메일</p>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-1.5" />
                  <p className="text-sm text-gray-700">{inquiry.email}</p>
                </div>
              </div>

              {inquiry.phone ? (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">연락처</p>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-1.5" />
                    <p className="text-sm text-gray-700">{inquiry.phone}</p>
                  </div>
                </div>
              ) : (
                inquiry.company && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">회사/기관</p>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-500 mr-1.5" />
                      <p className="text-sm text-gray-700">{inquiry.company}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* 서비스 및 관심 기능 정보 */}
            {(inquiry.serviceType || inquiry.interest) && (
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiry.serviceType && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">문의 서비스 유형</p>
                    <p className="text-sm text-gray-700">{inquiry.serviceType}</p>
                  </div>
                )}
                {inquiry.interest && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">관심 기능</p>
                    <p className="text-sm text-gray-700">{inquiry.interest}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 문의 메시지 */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
              <span className="bg-sky-100 p-1 rounded-full mr-2">
                <Mail className="h-4 w-4 text-blue-600" />
              </span>
              문의 내용
            </h4>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 whitespace-pre-wrap text-gray-700">
              {inquiry.message}
            </div>
          </div>

          {/* 답변 내용이 있을 경우 표시 */}
          {inquiry.replied && inquiry.reply_text && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-gray-700 flex items-center">
                  <span className="bg-sky-100 text-blue-600 p-1 rounded-full mr-2">
                    <Check className="h-4 w-4" />
                  </span>
                  답변 내용
                </h4>
                <p className="text-xs text-gray-500">
                  {inquiry.replied_at ? formatDateTime(inquiry.replied_at) : ""}
                </p>
              </div>
              <div className="bg-sky-50 border border-blue-100 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
                {inquiry.reply_text}
              </div>
            </div>
          )}
        </div>

        {/* 하단 액션 버튼 영역 */}
        <div className="flex justify-end gap-2 p-4 bg-gray-50 border-t">
          <button
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            닫기
          </button>
          {!inquiry.replied && (
            <button
              className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center"
              onClick={(e) => onReply(e)}
            >
              <Reply className="h-4 w-4 mr-1.5" />
              답변하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailModal;
