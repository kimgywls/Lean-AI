"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  CircleCheck,
  RefreshCw,
  AlertCircle,
  Paperclip,
  File,
  X,
} from "lucide-react";
import Spinner from "@/components/ui/Spinner";

export default function SendTab({ token, templateData }) {
  const [subject, setSubject] = useState(templateData?.title || ""); // 제목
  const [message, setMessage] = useState(templateData?.content || ""); // 내용
  const [files, setFiles] = useState([]); // 첨부 파일 목록
  const [isLoading, setIsLoading] = useState(false); // 전송 중 여부
  const [showSuccess, setShowSuccess] = useState(false); // 성공 알림 표시
  const [showError, setShowError] = useState(false); // 실패 알림 표시

  // 템플릿 데이터가 변경될 때마다 필드 업데이트
  useEffect(() => {
    if (templateData) {
      setSubject(templateData.title ?? null);
      setMessage(templateData.content ?? null);
    }
  }, [templateData]);

  // 전송 처리
  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("message", message);

    // 여러 파일 첨부
    files.forEach((file) => {
      formData.append("file", file);
    });

    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/newsletter-logs/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 성공 후 초기화
      setIsLoading(false);
      setSubject("");
      setMessage("");
      setFiles([]);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      setShowError(true);
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    e.target.value = null; // 동일 파일 다시 선택 가능하게
  };

  // 개별 파일 제거
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 초기화 핸들러
  const handleReset = () => {
    setSubject("");
    setMessage("");
    setFiles([]);
  };

  // 파일 크기 포맷 함수
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="p-8 space-y-4 bg-white">
      {/* 성공 메시지 박스*/}
      {showSuccess && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded">
          <div className="flex items-center">
            <CircleCheck className="h-6 w-6 mr-2" />
            <p className="text-lg font-semibold">
              뉴스레터가 성공적으로 발송되었습니다.
            </p>
          </div>
        </div>
      )}
      {/* 에러 메시지 박스*/}
      {showError && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 mr-2" />
            <p className="text-lg font-semibold">
              전송에 실패했습니다. 다시 시도해주세요.
            </p>
          </div>
        </div>
      )}

      {/* 제목 입력 */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          제목
        </label>
        <input
          id="subject"
          className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="뉴스레터 제목을 입력하세요"
          value={subject ?? ""}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* 내용 입력 */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          내용
        </label>
        <textarea
          id="message"
          className="w-full px-4 py-3 h-64 border border-sky-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="내용을 입력하세요..."
          value={message ?? ""}
          onChange={(e) => setMessage(e.target.value)}
        />
        {!message && (
          <div className="mt-2 flex items-start text-sky-600 text-xs">
            <AlertCircle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 mt-0.5" />
            <span>내용을 입력하면 뉴스레터를 발송할 수 있습니다.</span>
          </div>
        )}
      </div>

      {/* 파일 업로드 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700"
          >
            첨부 파일 (선택)
          </label>
          {files.length > 0 && (
            <span className="text-xs text-gray-500">
              {files.length}개의 파일이 첨부됨
            </span>
          )}
        </div>

        {/* 파일 선택 버튼 */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-4 py-3 border border-sky-200 rounded-xl text-gray-700 w-full flex items-center bg-white hover:bg-sky-50 transition-colors mb-2"
        >
          <Paperclip className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm">파일을 선택해주세요</span>
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            multiple
            onChange={handleFileChange}
          />
        </label>

        {/* 첨부된 파일 목록 */}
        {files.length > 0 && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto border border-sky-100 rounded-xl p-3 bg-sky-50">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-2 rounded-lg border border-sky-100"
              >
                <div className="flex items-center overflow-hidden">
                  <File className="h-3.5 w-3.5 mr-2 text-sky-500 flex-shrink-0" />
                  <span className="text-xs text-gray-700 truncate">
                    {file.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 flex-shrink-0">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
                  title="첨부 파일 제거"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          className="px-5 py-3 border border-sky-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-sky-50 flex items-center transition-colors"
          onClick={handleReset}
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          초기화
        </button>
        <button
          className={`px-6 py-3 bg-sky-400 text-white font-medium rounded-xl ${
            isLoading || !subject || !message
              ? "opacity-70 cursor-not-allowed"
              : "bg-sky-500"
          } flex items-center transition-colors`}
          onClick={handleSend}
          disabled={isLoading || !subject || !message}
        >
          {isLoading ? (
            <>
              <Spinner />
              발송 중...
            </>
          ) : (
            <>발송하기 {files.length > 0 && `(첨부 ${files.length}개)`}</>
          )}
        </button>
      </div>
    </div>
  );
}
