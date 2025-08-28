// RecruitAddModal.jsx
"use client";

import { useState } from "react";
import { X, FilePlus2, CirclePlus } from "lucide-react";
import axios from "axios";

export default function RecruitAddModal({ isOpen, onClose, onSuccess, token }) {
  const [jobName, setJobName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jobName || !jobLink) {
      setError("직무 이름과 링크를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/recruit/`,
        { name: jobName, url: jobLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobName("");
      setJobLink("");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("직무 추가 실패", err);
      setError("직무 추가에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-sky-50">
          <h3 className="flex items-center text-lg font-bold text-sky-600">
            <FilePlus2 className="h-5 w-5 mr-2" />새 채용정보 추가
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              직무 이름
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="예: 백엔드 개발자"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              채용 링크
            </label>
            <input
              type="url"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              placeholder="https://example.com/job"
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
            >
              <CirclePlus className="h-5 w-5 mr-2" />
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
