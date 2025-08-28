import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  MessageSquare,
  Reply,
  Eye,
  User,
  Building,
  RefreshCw,
} from "lucide-react";
import SuccessModal from "@/components/modal/common/SuccessModal";
import ErrorModal from "@/components/modal/common/ErrorModal";
import Spinner from "@/components/ui/Spinner";
import InquiryDetailModal from "@/components/modal/admin_inquiry/InquiryDetailModal";
import ReplyModal from "@/components/modal/admin_inquiry/ReplyModal";
import Pagination from "@/components/common/CardPagination";

export default function InquiryTab({ token }) {
  const [inquiries, setInquiries] = useState([]); // 전체 문의 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selected, setSelected] = useState(null); // 현재 선택된 문의 (모달용)
  const [replyModalOpen, setReplyModalOpen] = useState(false); // 답변 모달
  const [detailModalOpen, setDetailModalOpen] = useState(false); // 상세 모달
  const [successOpen, setSuccessOpen] = useState(false); // 성공 모달
  const [errorOpen, setErrorOpen] = useState(false); // 에러 모달
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1);// 전체 페이지 수
  const itemsPerPage = 4; // 한 페이지에 표시할 문의 수

  // 토큰이 있을 때 문의 불러오기
  useEffect(() => {
    if (token) fetchInquiries();
  }, [token]);

  // 문의 목록 불러오기
  const fetchInquiries = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/inquiry/admin/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 데이터 타입 방어 코드
      const inquiryData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.results)
          ? res.data.results
          : [];

      setInquiries(inquiryData);
      setTotalPages(Math.ceil(inquiryData.length / itemsPerPage));
    } catch (error) {
      console.error("문의 목록 불러오기 실패", error);
      setErrorMessage("문의 목록을 불러오는 데 실패했습니다.");
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // 답변 제출
  const handleReplySubmit = async (replyText) => {
    if (!replyText.trim()) {
      setErrorMessage("답변 내용을 입력해주세요.");
      setErrorOpen(true);
      return;
    }

    try {
      /*console.log("📤 보내는 데이터", {
        replyText,
      });*/
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/inquiry/admin/${selected.id}/`,
        {
          reply_text: replyText,
          replied: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplyModalOpen(false);
      fetchInquiries();
      setSuccessOpen(true);
    } catch (error) {
      console.error("답변 등록 실패", error);
      setErrorMessage("답변 등록에 실패했습니다.");
      setErrorOpen(true);
    }
  };

  // 날짜 형식 포맷터
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // 상세보기 모달 열기
  const openDetailModal = (inquiry) => {
    setSelected(inquiry);
    setDetailModalOpen(true);
  };

  // 답변 모달 열기 (버튼 클릭 시 전파 방지 포함)
  const openReplyModal = (inquiry, e) => {
    e.stopPropagation();
    setSelected(inquiry);
    setReplyModalOpen(true);
  };

  // 현재 페이지에 해당하는 문의 리스트 추출
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return inquiries.slice(startIndex, endIndex);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* 상단 타이틀 + 새로고침 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-800 mr-1">문의 관리</h2>
            <button
              onClick={fetchInquiries}
              className="p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-colors"
              title="새로고침"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            총 {inquiries.length}개의 문의가 있습니다
          </div>
        </div>

        {/* 로딩 중 */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Spinner />
          </div>
        ) : inquiries.length === 0 ? (
          // 데이터 없음
          <div className="bg-gray-50 rounded-xl shadow-sm p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              문의 내역이 없습니다
            </h3>
            <p className="text-gray-500">아직 접수된 문의가 없습니다.</p>
          </div>
        ) : (
          // 문의 리스트
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getCurrentPageItems().map((inquiry) => (
              <div
                key={inquiry.id}
                className="border border-sky-200 rounded-xl shadow-sm bg-white overflow-hidden transition hover:shadow-md"
              >
                <div className="p-5 flex flex-col h-full">
                  {/* 문의 상단: 이름, 상태 뱃지 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-1.5" />
                      <h3 className="font-semibold text-gray-800">
                        {inquiry.name}
                      </h3>
                    </div>
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

                  {/* 회사명 */}
                  {inquiry.company && (
                    <div className="flex items-center mb-2">
                      <Building className="h-4 w-4 text-gray-400 mr-1.5" />
                      <span className="text-sm text-gray-500">
                        {inquiry.company}
                      </span>
                    </div>
                  )}

                  {/* 문의 내용 요약 */}
                  <div className="bg-gray-50 rounded-xl p-2 line-clamp-2 text-gray-700 text-sm">
                    {inquiry.message}
                  </div>

                  {/* 하단: 날짜 및 버튼들 */}
                  <div className="mt-auto flex justify-between items-center pt-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {formatDate(inquiry.created_at)}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* 상세보기 */}
                      <button
                        onClick={() => openDetailModal(inquiry)}
                        className="flex items-center text-gray-500 hover:text-gray-700 hover:font-semibold text-sm px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        상세보기
                      </button>

                      {/* 미답변일 경우에만 답변 버튼 */}
                      {!inquiry.replied && (
                        <button
                          onClick={(e) => openReplyModal(inquiry, e)}
                          className="flex items-center text-blue-500 hover:text-blue-600 hover:font-semibold text-sm px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Reply className="w-3.5 h-3.5 mr-1" />
                          답변
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 상세보기 및 답변 모달 */}
      {selected && (
        <>
          <InquiryDetailModal
            inquiry={selected}
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            onReply={(e) => {
              setDetailModalOpen(false);
              openReplyModal(selected, e);
            }}
            formatDate={formatDate}
          />
          <ReplyModal
            inquiry={selected}
            isOpen={replyModalOpen}
            onClose={() => setReplyModalOpen(false)}
            onSubmit={handleReplySubmit}
          />
        </>
      )}

      {/* 성공/에러 모달 */}
      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="답변이 성공적으로 등록되었습니다."
      />
      <ErrorModal
        isOpen={errorOpen}
        onClose={() => setErrorOpen(false)}
        message={errorMessage}
      />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
