// components/modal/recruit/RecruitEditModal.js
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function RecruitEditModal({ isOpen, onClose, onSuccess, token, job }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (job) {
      setName(job.name);
      setUrl(job.url);
    }
  }, [job]);

  const handleUpdate = async () => {
    try {
        console.log(`name : ${name} / url : ${url}`);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/recruit/${job.id}/`,
        { name, url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("수정 실패", error);
      alert("수정 중 문제가 발생했습니다.");
    }
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">채용 정보 수정</h2>
        <div className="space-y-4">
          <Input
            placeholder="직무 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="채용 URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mt-6 text-right">
          <Button onClick={handleUpdate} className="bg-sky-500 hover:bg-sky-600 text-white">
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
