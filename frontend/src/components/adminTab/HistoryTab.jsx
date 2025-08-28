"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  EyeIcon,
  RefreshCw,
  XIcon,
  Mails,
  Paperclip,
  FileSearch,
  File,
} from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import Pagination from "@/components/common/TablePagination";

export default function HistoryTab({ token }) {
  const [logs, setLogs] = useState([]); // 뉴스레터 발송 로그 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지당 표시할 로그 수
  const totalPages = Math.ceil(logs.length / itemsPerPage); // 총 페이지 수
  const [selectedLog, setSelectedLog] = useState(null); // 선택된 로그
  const [messageModalOpen, setMessageModalOpen] = useState(false); // 모달 열림 여부

  // 컴포넌트 마운트 또는 token이 변경될 때 발송 로그 불러오기
  useEffect(() => {
    if (token) fetchLogs();
  }, [token]);

  // 발송 이력 불러오기
  const fetchLogs = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/newsletter-logs/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 응답 데이터 정리
      const logData = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      setLogs(logData);
      //console.log("📨 발송 이력:", logData);
    } catch (err) {
      console.error("발송 이력 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 모달 열기
  const openModal = (log) => {
    setSelectedLog(log);
    setMessageModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedLog(null);
    setMessageModalOpen(false);
  };

  // 파일 미리보기 처리 함수
  const handlePreview = (attachment) => {
    if (!attachment.attachments_url) return;

    const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}${attachment.attachments_url}`;
    window.open(url, "_blank"); // 새 탭에서 미리보기
  };

  // 미리보기용 메시지 텍스트 가공 함수
  const formatPreviewText = (text) => {
    if (!text) return "";
    const cleanText = text.replace(/\n/g, " ").trim();
    return cleanText.length > 80
      ? cleanText.substring(0, 80) + "..."
      : cleanText;
  };

  // 현재 페이지의 로그 데이터만 추출
  const getCurrentPageLogs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return logs.slice(startIndex, endIndex);
  };

  return (
    <div className="p-8 bg-white">
      {/* 상단 헤더 */}
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mr-1">발송 이력</h2>
        {/* 새로고침 버튼 */}
        <button
          onClick={fetchLogs}
          className="p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-colors"
          title="새로고침"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* 로딩 중일 때 */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Spinner />
        </div>
      ) : logs.length === 0 ? (
        // 데이터 없음
        <div className="bg-gray-50 rounded-xl shadow-sm p-12 text-center">
          <div className="flex justify-center mb-4">
            <Mails className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            발송이력이 없습니다
          </h3>
          <p className="text-gray-500">아직 발송한 뉴스 레터가 없습니다.</p>
        </div>
      ) : (
        // 테이블 렌더링
        <div className="border border-sky-200 bg-white rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-sky-50 text-sky-700 font-medium">
              <tr>
                <th className="px-4 py-3 border-b">번호</th>
                <th className="px-4 py-3 border-b">제목</th>
                <th className="px-4 py-3 border-b">내용</th>
                <th className="px-4 py-3 border-b">첨부</th>
                <th className="px-4 py-3 border-b">발송일</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageLogs().map((log, idx) => {
                const date = new Date(log.sent_at);
                const formattedDate = `${date.getFullYear()}.${
                  date.getMonth() + 1
                }.${date.getDate()}`;

                // 첨부 파일 정보 확인
                const attachmentCount = log.attachments?.length || 0;

                return (
                  <tr
                    key={log.id}
                    className="border-t transition-colors hover:bg-sky-50"
                  >
                    <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {log.subject}
                    </td>
                    <td
                      className="px-4 py-3 text-gray-600 group"
                      onClick={() => openModal(log)}
                    >
                      <div className="flex items-center justify-between cursor-pointer">
                        <div className="flex-1 truncate w-40 mr-2">
                          {formatPreviewText(log.message)}
                        </div>
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-sky-100 text-sky-600 px-2 py-1 rounded flex items-center space-x-1 text-xs hover:bg-sky-200"
                          title="전체 내용 보기"
                        >
                          <EyeIcon className="h-3 w-3" />
                          <span>보기</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {attachmentCount > 0 ? (
                        <div className="flex items-center text-sky-600">
                          <Paperclip className="h-4 w-4 mr-1" />
                          <span>{attachmentCount}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 모달 창 - 선택된 뉴스레터 전체 내용 표시 */}
      {messageModalOpen && selectedLog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-auto overflow-hidden transition-all transform animate-fadeIn"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
          >
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-sky-50">
              <h3 className="text-lg font-bold text-gray-800">뉴스레터 내용</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="px-6 py-4">
              <h4 className="text-xl font-bold mb-3 text-gray-800">
                {selectedLog.subject}
              </h4>
              <div className="text-sm text-gray-500 mb-4 flex items-center">
                <span>
                  발송일:{" "}
                  {new Date(selectedLog.sent_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="border-t border-b border-gray-100 py-6 my-4">
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap max-h-[40vh] overflow-y-auto">
                  {selectedLog.message}
                </div>
              </div>

              {/* 첨부 파일 섹션 추가 */}
              {selectedLog.attachments &&
                selectedLog.attachments.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Paperclip className="h-4 w-4 mr-1.5 text-sky-500" />
                      첨부 파일 ({selectedLog.attachments.length}개)
                    </h5>
                    <div className="border border-sky-100 rounded-lg bg-sky-50 p-2">
                      {selectedLog.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-2 bg-white my-1 rounded border border-sky-100 hover:border-sky-200 transition-colors"
                        >
                          <div className="flex items-center overflow-hidden">
                            <File className="h-4 w-4 mr-2 text-sky-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700 truncate">
                              {attachment.filename}
                            </span>
                          </div>
                          <button
                            onClick={() => handlePreview(attachment)}
                            className="ml-2 p-1.5 text-sky-500 hover:text-sky-600 hover:bg-sky-50 rounded-full focus:outline-none transition-colors"
                            title="파일 미리보기"
                          >
                            <FileSearch  className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* 모달 하단 닫기 버튼 */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
                onClick={closeModal}
              >
                <span>닫기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* 모달 애니메이션 스타일 정의 */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
