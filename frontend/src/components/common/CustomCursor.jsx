"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });   // 마우스 위치 상태
  const [cursorColor, setCursorColor] = useState("bg-sky-400");   // 커서 색상 상태

      // 마우스 이동 시 호출되는 함수
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY }); // 현재 마우스 위치 저장

      const element = document.elementFromPoint(e.clientX, e.clientY); // 해당 위치의 DOM 요소 가져오기

      if (element) {
        const classList = element.className; // 요소의 클래스 확인

        // 클래스 이름 문자열일 경우 특정 색상 키워드 포함 여부로 커서 색상 변경
        if (typeof classList === "string") {
          if (classList.includes("bg-blue")) {
            setCursorColor("bg-white"); // 파란 배경 요소 위에서는 흰색 커서
          } else if (
            classList.includes("bg-indigo") ||
            classList.includes("bg-violet")
          ) {
            setCursorColor("bg-violet-500"); // 보라 계열 배경 위에서는 진보라
          } else {
            setCursorColor("bg-sky-400"); // 기본은 하늘색
          }
        }
      }
    };

    // 마우스 이동 이벤트 리스너 등록
    window.addEventListener("mousemove", updateMousePosition);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    // framer-motion을 사용한 부드러운 위치 이동
    <motion.div
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-30 ${cursorColor}`}
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }} // 마우스 중심에 위치하도록 -12 보정
      transition={{ type: "spring", stiffness: 500, damping: 28 }} // 부드러운 스프링 애니메이션
    />
  );
}