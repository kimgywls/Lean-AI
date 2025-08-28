"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Mail, CheckCircle } from "lucide-react";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

const NewsletterButton = ({ activeTab = "leanai" }) => {
  const [isOpen, setIsOpen] = useState(false); // 폼 열림 여부
  const [email, setEmail] = useState(""); // 입력된 이메일
  const [isSubmitted, setIsSubmitted] = useState(false); // 전송 완료 여부
  const [showTooltip, setShowTooltip] = useState(false); // 툴팁 표시 여부
  const [error, setError] = useState(""); // 에러 메시지
  const inputRef = useRef(null); // 이메일 input 포커스용 ref

    // 폼 열렸을 때 input 자동 포커싱
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

 // 구독 완료 후 자동으로 폼 닫기
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        // 폼이 닫힌 후에 isSubmitted 상태 초기화
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
        }, 500); // 애니메이션이 완료된 후 상태 초기화
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

    // 버튼 클릭 핸들러
  const handleClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowTooltip(false);
    }
    // 버튼을 다시 클릭할 때 에러와 이전 제출 상태를 초기화
    setError("");
    if (!isOpen) setIsSubmitted(false);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_DOMAIN}/api/newsletter/email-subscribers/`,
        { email }
      );

      if (res.status === 201) {
        setEmail("");
        setError("");
        setIsSubmitted(true);
      } else {
        setError("예상치 못한 응답입니다. 다시 시도해주세요.");
        setIsSubmitted(false);
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.email?.[0] ||
        error.response?.data?.detail ||
        "이미 구독했거나 잘못된 이메일입니다."
      );
      setIsSubmitted(false);
    }
  };

  // 색상 스타일 조건부 클래스
  const formBorderClass = activeTab === "leanai" ? "border-l-sky-500" : "border-l-indigo-500";
  const iconColorClass = activeTab === "leanai" ? "text-sky-500" : "text-indigo-500";

  return (
    <div className="fixed bottom-20 right-8 z-50 font-ibm">
      {/* 폼 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl p-5 w-72 border-l-4 ${formBorderClass}`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>

            {/* 입력 폼 / 전송 완료 뷰 */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleSubmit}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <Mail className={`h-4 w-4 ${iconColorClass}`} />
                    <h3 className="font-semibold text-gray-800">뉴스레터 구독하기</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-gmarket px-2">
                    최신 소식과 업데이트를 받아보세요!
                  </p>

                  {/* 입력 */}
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="email"
                      placeholder="이메일 주소"
                      className={`w-full border border-gray-200 rounded-md p-2 pr-10 text-sm focus:outline-none focus:ring-2 
                          ${activeTab === "leanai" ? "focus:ring-sky-400" : "focus:ring-indigo-400"}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>

                  {/* 에러 표시 */}
                  {error && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
                  )}

                  {/* 전송 버튼 */}
                  <motion.button
                    type="submit"
                    className={`w-full py-2 px-2 rounded-md text-white font-medium shadow-md
                      ${
                        activeTab === "leanai"
                          ? "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600"
                          : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    구독하기
                  </motion.button>

                  <p className="text-gray-400 text-xs text-center mt-2">
                    언제든지 구독을 취소할 수 있습니다
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  className="text-center py-4 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CheckCircle className={`h-12 w-12 mx-auto ${iconColorClass}`} />
                  </motion.div>
                  <h3 className="text-gray-800 font-semibold">구독이 완료되었습니다!</h3>
                  <p className="text-gray-500 text-sm">곧 최신 소식을 전해드릴게요</p>
                  <motion.div
                    className="text-xs text-gray-400 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    3초 후 자동으로 닫힙니다
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 툴팁 */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            className="absolute bottom-12 right-0 bg-gray-800 text-white text-xs px-3 py-2 rounded-md shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            뉴스레터 구독하기
          </motion.div>
        )}
      </AnimatePresence>

      {/* 플로팅 버튼 */}
      <motion.div
        className={`relative rounded-full p-0.5 shadow-lg ${
          activeTab === "leanai"
            ? "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600"
            : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="bg-white rounded-full p-3 flex items-center justify-center"
          aria-label="뉴스레터 구독"
        >
          <Send className={`h-5 w-5 ${iconColorClass}`} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NewsletterButton;