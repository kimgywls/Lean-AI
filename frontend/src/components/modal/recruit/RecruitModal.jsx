"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X, Briefcase, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/recruit/`;

export default function RecruitModal({ isOpen, onClose, onSelect }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        console.log("API_URL:", API_URL); // 실제 URL이 뭐로 찍히는지

        const res = await axios.get(API_URL);
        const jobList = Array.isArray(res.data) ? res.data : res.data.jobs;
        console.log("data : ", res.data);

        if (Array.isArray(jobList)) {
          setJobs(jobList);
        } else {
          console.error("예상과 다른 응답 형태:", res.data);
          setJobs([]); // fallback
        }
      } catch (err) {
        console.error("직무 목록 로딩 실패", err);
        setJobs([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      setSelectedJobId(null);
      fetchJobs();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleJobSelect = (job) => {
    setSelectedJobId(job.id);
    setTimeout(() => {
      onSelect(job.url);
    }, 300);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-2xl"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 섹션 */}
            <div className="bg-blue-400 p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-all"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white">관심 직무 선택</h3>
              </div>
              <p className="text-white text-sm">
                지원하고 싶은 직무를 선택해 상세 정보를 확인하세요
              </p>
            </div>

            {/* 리스트 영역 */}
            <div className="px-6 py-6 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-500">
                    직무 정보를 불러오는 중입니다...
                  </p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium mb-1">
                    등록된 직무가 없습니다
                  </p>
                  <p className="text-gray-500 text-sm">
                    현재 모집 중인 직무가 없습니다.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {jobs.map((job) => (
                    <motion.li
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200 group ${
                          selectedJobId === job.id
                            ? "bg-sky-300 text-white shadow-md shadow-sky-200"
                            : "bg-white hover:bg-sky-50 text-gray-700 border border-gray-100 hover:border-sky-200 hover:shadow-md"
                        }`}
                        onClick={() => handleJobSelect(job)}
                      >
                        <span className="font-medium">{job.name}</span>
                        <ChevronRight
                          className={`h-5 w-5 transition-transform duration-300 ${
                            selectedJobId === job.id
                              ? "text-white"
                              : "text-sky-500 group-hover:translate-x-1"
                          }`}
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
