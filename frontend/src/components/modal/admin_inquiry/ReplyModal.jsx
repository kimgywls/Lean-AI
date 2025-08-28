import React, { useState, useEffect } from "react";
import { X, Send, Mail, Reply } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

const ReplyModal = ({ inquiry, isOpen, onClose, onSubmit }) => {
  const [replyText, setReplyText] = useState(""); // 답변 텍스트 상태
  const [isLoading, setIsLoading] = useState(false); // 전송 중 로딩 상태

  // 모달 열릴 때 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setReplyText("");
      setIsLoading(false);
    }
  }, [isOpen]);

  // 답변 전송 핸들러
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(replyText); // 부모로부터 받은 onSubmit 실행
      setIsLoading(false);
      onClose(); // 전송 성공 시 모달 닫기
    } catch (error) {
      console.error("답변 전송 실패", error);
      setIsLoading(false);
    }
  };

  // 모달 열림 여부 또는 inquiry 없으면 렌더링하지 않음
  if (!isOpen || !inquiry) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-sky-50">
          <h3 className="flex items-center text-lg font-bold text-sky-600">
            <Reply className="h-5 w-5 mr-2" />
            답변 작성
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 본문 내용 */}
        <div className="p-5">
          {/* 문의 정보 박스 */}
          <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {inquiry.name}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                ({inquiry.email})
              </span>
            </div>

            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500 mb-1">문의 내용</p>
              <p className="text-sm text-gray-600 max-h-32 overflow-y-auto">
                {inquiry.message}
              </p>
            </div>
          </div>

          {/* 답변 입력 영역 */}
          <div className="mb-2">
            <label
              htmlFor="reply"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              답변 내용
            </label>
            <textarea
              id="reply"
              rows={6}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all resize-none"
              placeholder="문의에 대한 답변을 작성해주세요."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex justify-end gap-2 p-5 bg-gray-50 border-t">
          <button
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
            disabled={isLoading}
          >
            취소
          </button>

          <button
            className={`px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isLoading || !replyText.trim()}
          >
            {/* 로딩 중 표시 */}
            {isLoading ? (
              <>
                <Spinner />
                전송 중...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-1.5" />
                답변 전송
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
