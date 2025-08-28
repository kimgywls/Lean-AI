"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Briefcase,
  ExternalLink,
  SquarePen,
  SquareX,
} from "lucide-react";
import axios from "axios";
import RecruitAddModal from "@/components/modal/recruit/RecruitAddModal";
import RecruitEditModal from "@/components/modal/recruit/RecruitEditModal";
import Pagination from "@/components/common/CardPagination";
import SuccessModal from "@/components/modal/common/SuccessModal";
import ErrorModal from "@/components/modal/common/ErrorModal";

const API_URL = `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/recruit/`;

export default function RecruitTab({ token }) {
  const [jobs, setJobs] = useState([]); // 전체 직무 목록
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지
  const [errorMsg, setErrorMsg] = useState(""); // 에러 메시지
  const [successOpen, setSuccessOpen] = useState(false); // 성공 모달 상태
  const [errorOpen, setErrorOpen] = useState(false); // 에러 모달 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 추가 모달
  const [editModalOpen, setEditModalOpen] = useState(false); // 수정 모달
  const [selectedJob, setSelectedJob] = useState(null); // 수정용 선택 직무

  // 페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 표시할 문의 수
  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // 토큰이 있을 때 작무 불러오기
  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  // 직무 목록 불러오기
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 데이터 타입 방어 처리
      const jobData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.results)
          ? res.data.results
          : [];

      setJobs(jobData);
    } catch (err) {
      console.error("직무 목록 로딩 실패", err);
      setErrorMsg("직무 목록을 불러오는데 실패했습니다.");
      setErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 현재 페이지에 해당하는 문의 리스트 추출
  const getCurrentPageItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(start, start + itemsPerPage);
  };

  // 수정 모달 열기
  const openEditModal = (job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  // 직무 삭제 처리
  const handleDelete = async (id) => {
    const confirm = window.confirm("정말로 이 채용 정보를 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("채용 정보가 삭제되었습니다.");
      setSuccessOpen(true);
      fetchJobs(); // 목록 다시 불러오기
    } catch (err) {
      console.error("삭제 실패", err);
      setErrorMsg("채용 정보 삭제 중 문제가 발생했습니다.");
      setErrorOpen(true);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* 상단 타이틀 및 추가 버튼 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">채용 직무 관리</h2>
          <p className="text-gray-500 mt-1">
            회사의 채용 직무를 추가하고 관리하세요
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 shadow-md"
        >
          <Plus className="h-5 w-5 mr-2" />
          채용정보 추가
        </button>
      </div>

      {/* 검색 입력창 */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="직무 이름으로 검색..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // 검색 시 페이지 초기화
            }}
          />
        </div>
      </div>

      {/* 로딩 중 상태 */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500"></div>
        </div>
      ) : (
        <>
          {/* 데이터 없음 */}
          {getCurrentPageItems().length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-50">
              <div className="flex justify-center mb-4">
                <Briefcase className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                채용중인 직무가 없습니다
              </h3>
              <p className="text-gray-500">
                새 직무 추가 버튼을 클릭하여 첫 번째 직무를 추가해보세요
              </p>
            </div>
          ) : (
            // 직무 리스트 출력
            <div className="bg-white rounded-xl border border-sky-200 overflow-hidden">
              {getCurrentPageItems().map((job, index) => (
                <div
                  key={job.id}
                  className={`flex justify-between items-center p-5 ${
                    index !== getCurrentPageItems().length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } transition-colors`}
                >
                  <div className="flex items-center space-x-4 w-full">
                    {/* 아이콘 */}
                    <div className="bg-sky-100 rounded-full p-2 hidden sm:flex">
                      <Briefcase className="h-5 w-5 text-sky-600" />
                    </div>

                    <div className="flex flex-row w-full items-center">
                      {/* 직무명 + 링크 */}
                      <div className="flex flex-col ">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {job.name}
                        </h3>
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 hover:underline text-sm flex items-center mt-1 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          채용 페이지 바로가기
                        </a>
                      </div>

                      {/* 수정/삭제 버튼 */}
                      <div className="flex flex-row space-x-5 justify-end items-center ml-auto">
                        <button
                          onClick={() => openEditModal(job)}
                          className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                          <SquarePen className="h-5 w-5" />
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-500 hover:text-red-600 text-sm"
                        >
                          <SquareX className="h-5 w-5" />
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      
      {/* 성공 메시지 모달 */}
      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        message={successMessage}
      />

      {/* 실패 메시지 모달 */}
      <ErrorModal
        isOpen={errorOpen}
        onClose={() => setErrorOpen(false)}
        message={errorMsg}
      />

      {/* 직무 수정 모달 */}
      <RecruitEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={() => {
          setSuccessMessage("채용 정보가 수정되었습니다.");
          setSuccessOpen(true);
          fetchJobs();
        }}
        token={token}
        job={selectedJob}
      />

      <RecruitAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setSuccessMessage("새 채용정보가 추가되었습니다.");
          setSuccessOpen(true);
          fetchJobs();
        }}
        token={token}
      />
    </div>
  );
}
