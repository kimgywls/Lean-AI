"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollToTopButton = ({ activeTab = "leanai" }) => {
  // 버튼 클릭 시 실행되는 함수
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 최상단으로 부드럽게 이동
  };

  // 테마에 따라 버튼 색상 클래스 지정
  const buttonClass =
    activeTab === "leanai"
      ? "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600"
      : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600";

  return (
    <motion.button
      className={`fixed bottom-8 right-8 text-white p-3 rounded-full shadow-lg z-50 transition-all ${buttonClass}`} // 버튼 스타일
      initial={{ opacity: 0, y: 20 }} // 초기 상태: 아래쪽에서 투명하게 시작
      animate={{ opacity: 1, y: 0 }} // 애니메이션: 서서히 나타나며 위로 이동
      transition={{ delay: 1, duration: 0.5 }} // 1초 후 0.5초간 애니메이션
      onClick={handleClick} // 클릭 시 상단으로 이동
    >
      <ChevronDown className="h-5 w-5 rotate-180" />
    </motion.button>
  );
};

export default ScrollToTopButton;
