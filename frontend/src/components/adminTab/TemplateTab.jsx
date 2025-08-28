"use client";
import { useState } from "react";
import {
  LayoutTemplate,
  Plus,
  Edit,
  Trash,
  X,
  Copy,
  Calendar,
  Tag,
  ChevronDown,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useCustomTemplates } from "@/hooks/useCustomTemplates";
import SuccessModal from "@/components/modal/common/SuccessModal";
import ErrorModal from "@/components/modal/common/ErrorModal";
import TemplateEditModal from "@/components/modal/newsletter/TemplateEditModal";
import TemplateDeleteModal from "@/components/modal/newsletter/TemplateDeleteModal";
import Pagination from "@/components/common/CardPagination";

export default function TemplateTab({ token, onUseTemplate }) {
  // 템플릿 관련 커스텀 훅
  const {
    templates, loading, currentTemplate, setCurrentTemplate, isEditing,
    successMessage, setSuccessMessage, errorMsg, setErrorMsg,
    templateToDelete, setTemplateToDelete, prepareTemplate, saveTemplate,
    deleteTemplate, duplicateTemplate, replaceVariables,
    itemsPerPage, totalPages,
  } = useCustomTemplates(token);

  const [modalOpen, setModalOpen] = useState(false); // 편집 모달
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // 삭제 확인 모달
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState("무물"); // 솔루션 선택
  const [selectedDate, setSelectedDate] = useState(new Date()); // 날짜 선택
  const [showDatePicker, setShowDatePicker] = useState(false);;

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 템플릿 생성/수정 모달 열기
  const openTemplateModal = (template = null) => {
    const isEditMode = prepareTemplate(template);
    setModalOpen(true);
    console.log(
      "템플릿 모달 열기:",
      isEditMode ? "수정 모드" : "생성 모드",
      template?.id
    );
  };

  // 템플릿 저장 후 모달 닫기
  const handleSaveTemplate = async () => {
    const result = await saveTemplate();
    if (result.success) {
      setModalOpen(false);
      setSuccessOpen(true);

      // 3초 후 성공 메시지 제거
      setTimeout(() => {
        setSuccessOpen(false);
      }, 3000);
    } else {
      setErrorOpen(true);
    }
  };

  // 템플릿 삭제 확인 모달 열기
  const openDeleteConfirm = (template) => {
    setTemplateToDelete(template);
    setDeleteConfirmOpen(true);
  };

  // 템플릿 삭제 처리
  const handleDeleteTemplate = async () => {
    if (!templateToDelete) return;

    const result = await deleteTemplate(templateToDelete.id);
    setDeleteConfirmOpen(false);

    if (result.success) {
      setSuccessOpen(true);

      // 3초 후 성공 메시지 제거
      setTimeout(() => {
        setSuccessOpen(false);
      }, 3000);
    } else {
      setErrorOpen(true);
    }

    setTemplateToDelete(null);
  };

  // 템플릿 복제하기
  const handleDuplicateTemplate = (template) => {
    duplicateTemplate(template);
    setModalOpen(true);
  };

  // 템플릿 뉴스레터로 사용하기
  const useTemplateForNewsletter = (template) => {
    // 현재 날짜와 시간 기준으로 변수 값 설정
    const currentVariables = {
      날짜: formatSelectedDate(selectedDate),
      요일: formatSelectedDay(selectedDate),
      솔루션명: selectedSolution,
      회사명: "린에이아이",
      담당자: "정찬혁",
      연락처: "010-1234-5678",
    };

    // 변수가 치환된 내용으로 템플릿 처리
    const replacedContent = replaceVariables(
      template.content,
      currentVariables
    );

    // 부모 컴포넌트로 템플릿 정보 전달 (NewsletterPage에서 handleUseTemplate 함수 호출)
    if (onUseTemplate) {
      onUseTemplate({
        title: template.title,
        content: replacedContent,
      });

      // 전송 후엔
      setTimeout(() => {
        onUseTemplate(null);
      }, 3000); // 전송 성공 모달 닫힌 뒤 초기화
    }

    // 성공 메시지 표시
    setSuccessOpen(true);
    setSuccessMessage(
      `템플릿 "${template.title}"이(가) 뉴스레터 작성 페이지로 전달되었습니다.`
    );

    // 3초 후 성공 메시지 제거
    setTimeout(() => {
      setSuccessOpen(false);
    }, 3000);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식 (오후 3시 → 15:00)
    });
  };
  const formatSelectedDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatSelectedDay = (date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "long" });
  };

   // 변수 치환 시 사용할 값들
  const variableValues = {
    날짜: formatSelectedDate(selectedDate),
    요일: formatSelectedDay(selectedDate),
    솔루션명: selectedSolution, // 선택된 솔루션 사용
    회사명: "린에이아이",
    담당자: "정찬혁",
    연락처: "010-1234-5678",
  };

  // 현재 페이지에 표시할 템플릿 추출
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return templates.slice(startIndex, endIndex);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8 bg-white">
      {/* 헤더 및 새 템플릿 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">템플릿 관리</h2>
        <div className="flex flex-wrap items-center gap-1">
          <div className="flex flex-col md:flex-row items-center">
            {/* 솔루션 */}
            <div className="flex items-center">
              <Tag className="h-4 w-4 text-sky-500 mr-2" />
              <label
                htmlFor="solution-select"
                className="text-sm font-medium text-gray-700 mr-2"
              >
                솔루션:
              </label>
              <select
                id="solution-select"
                value={selectedSolution}
                onChange={(e) => setSelectedSolution(e.target.value)}
                className="text-sm bg-sky-50 border border-sky-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none "
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="무물">무물</option>
                <option value="데이터 바우처">데이터 바우처</option>
                <option value="AI 바우처">AI 바우처</option>
              </select>
            </div>

            {/* 날짜 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center px-4 py-2 "
              >
                <Calendar className="h-4 w-4 text-sky-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 mr-2">
                  날짜:
                </span>
                <span className="text-sm bg-sky-50 border border-sky-200 rounded-md px-3 py-1 flex items-center">
                  {formatSelectedDate(selectedDate)}
                  <ChevronDown className="h-3.5 w-3.5 ml-2 text-gray-500" />
                </span>
              </button>

              {showDatePicker && (
                <div className="absolute z-10 mt-1 p-3 animate-in fade-in slide-in-from-top-5 duration-200 bg-white border border-sky-400 rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      날짜 선택
                    </h4>
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      setSelectedDate(newDate);
                      setShowDatePicker(false);
                    }}
                    className="w-full border border-sky-200 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 템플릿 목록 */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          <span className="ml-3 text-gray-600">불러오는 중...</span>
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <LayoutTemplate className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            템플릿이 없습니다
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            새 템플릿을 생성하여 뉴스레터 작성 시간을 단축하세요.
          </p>
          <button
            onClick={() => openTemplateModal()}
            className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            템플릿 생성하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getCurrentPageItems().map((template) => (
            <div
              key={template.id}
              className="border border-sky-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  최근 수정: {formatDate(template.updated_at)}
                </p>
                <div className="h-32 overflow-hidden bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-gray-600 text-sm whitespace-pre-line line-clamp-5">
                    {replaceVariables(template.content, variableValues)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => useTemplateForNewsletter(template)}
                    className="px-3 py-1.5 text-xs bg-sky-100 text-sky-600 rounded-md hover:bg-sky-200 transition-colors flex items-center"
                  >
                    <SquareArrowOutUpRight className="h-3 w-3 mr-1" />
                    뉴스레터
                  </button>
                  <button
                    onClick={() => openTemplateModal(template)}
                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    수정
                  </button>
                  <button
                    onClick={() => handleDuplicateTemplate(template)}
                    className="px-3 py-1.5 text-xs bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    복제
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(template)}
                    className="px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
                  >
                    <Trash className="h-3 w-3 mr-1" />
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 새 템플릿 버튼 */}
      <div className="flex items-center justify-end mt-4">
        <button
          onClick={() => openTemplateModal()}
          className="flex items-center bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />새 템플릿
        </button>
      </div>

      {/* 템플릿 편집 모달 */}
      {modalOpen && (
        <TemplateEditModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          currentTemplate={currentTemplate}
          setCurrentTemplate={setCurrentTemplate}
          isEditing={isEditing}
          onSave={handleSaveTemplate}
          selectedDate={selectedDate}
          selectedSolution={selectedSolution}
        />
      )}

      {/* 삭제 확인 모달 */}
      {deleteConfirmOpen && templateToDelete && (
        <TemplateDeleteModal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleDeleteTemplate}
          templateTitle={templateToDelete.title}
        />
      )}

      {/* 성공 문구 모달 */}
      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        message={successMessage}
      />

      {/* 실패 문구 모달 */}
      <ErrorModal
        isOpen={errorOpen}
        onClose={() => setErrorOpen(false)}
        message={errorMsg}
      />

      {/* 페이지 네이션션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
