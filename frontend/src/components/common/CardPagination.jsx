// components/common/CardPagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage, // 현재 페이지 번호
  totalPages, // 전체 페이지 수
  onPageChange, // 페이지 변경 핸들러
  maxPagesToShow = 5, // 최대 표시할 페이지 버튼 수 (기본값 5)
}) {
  // 전체 페이지 수가 1 이하인 경우 렌더링하지 않음
  if (totalPages <= 1) return null;

  const pageNumbers = []; // 보여줄 페이지 번호 배열
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2)); // 시작 페이지 계산
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1); // 끝 페이지 계산

  // 끝 페이지가 maxPagesToShow 미만일 때 시작 페이지 보정
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // 페이지 번호 배열 생성
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-10 space-x-1">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* 페이지 처음이 생략되었을 때 (예: ... 3 4 5) */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="flex items-center justify-center w-8 h-8 text-gray-400">
              ...
            </span>
          )}
        </>
      )}

      {/* 메인 페이지 버튼 목록 */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`flex items-center justify-center w-8 h-8 rounded-md ${
            currentPage === number
              ? "bg-sky-400 text-white font-semibold"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {number}
        </button>
      ))}

      {/* 페이지 마지막이 생략되었을 때 (예: 5 6 7 ... 10) */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="flex items-center justify-center w-8 h-8 text-gray-400">
              ...
            </span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
