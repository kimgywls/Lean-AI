"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Database, BarChartIcon as ChartBar, Users } from "lucide-react";

export default function AboutSection() {
  // 컨테이너 애니메이션 설정 - 전체 섹션의 애니메이션
  const containerVariants = {
    hidden: { opacity: 0 }, // 초기 상태: 투명 (안 보임)
    visible: {
      opacity: 1, // 표시 상태: 완전히 보임
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // 일반 아이템 애니메이션 설정 - 개별 요소의 애니메이션
  const itemVariants = {
    hidden: { y: 50, opacity: 0 }, // 초기 상태: 아래에서 시작하고 투명
    visible: {
      y: 0, // 표시 상태: 원래 위치로
      opacity: 1, // 표시 상태: 완전히 보임
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // 통계 카드 애니메이션 설정
  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 }, // 초기 상태: 축소되어 있고 투명
    visible: {
      scale: 1, // 표시 상태: 원래 크기로
      opacity: 1, // 표시 상태: 완전히 보임
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 숫자 카운터 컴포넌트 - 특정 숫자까지 애니메이션으로 카운트업 하는 컴포넌트
  const Counter = ({ end, title }) => {
    const [count, setCount] = useState(0); // 현재 카운트 값
    const nodeRef = useRef(null); // DOM 요소 참조를 위한 ref
    const [isInView, setIsInView] = useState(false); // 화면에 보이는지 여부

    // Intersection Observer를 설정하여 컴포넌트가 화면에 보이는지 감지
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        },
        { threshold: 0.3 } // 요소의 30%가 화면에 보일 때 콜백 실행
      );

      // 현재 DOM 요소를 관찰 대상으로 등록
      if (nodeRef.current) {
        observer.observe(nodeRef.current);
      }

      // 컴포넌트 언마운트 시 관찰 해제
      return () => {
        if (nodeRef.current) {
          observer.unobserve(nodeRef.current);
        }
      };
    }, []);

    // 요소가 화면에 보이면 숫자 애니메이션 시작
    useEffect(() => {
      if (!isInView) return; // 화면에 보이지 않으면 실행하지 않음

      const startTime = Date.now(); // 애니메이션 시작 시간
      const duration = 2000; // 애니메이션 지속 시간 (2초)

      // 타이머 설정하여 숫자 업데이트
      const timer = setInterval(() => {
        const now = Date.now(); // 현재 시간
        const elapsed = now - startTime; // 경과 시간
        const progress = Math.min(elapsed / duration, 1); // 진행도 (0~1 사이)

        // 진행도에 따라 현재 카운트 계산 및 업데이트
        setCount(Math.floor(progress * end));

        if (progress === 1) {
          clearInterval(timer);
        }
      }, 50);

      return () => clearInterval(timer);
    }, [end, isInView]);

    // 카운터 UI 렌더링
    return (
      <div ref={nodeRef} className="relative font-gmarket">
        <div className="text-5xl font-bold mb-3 text-indigo-600">{count}+</div>
        <div className="text-gray-700 text-lg font-medium">{title}</div>
      </div>
    );
  };

  // 컴포넌트 UI 렌더링
  return (
    <div>
      {/* About 섹션 */}
      <section
        id="about"
        className="py-10 md:py-20 bg-gradient-to-b from-white to-sky-50 w-full overflow-hidden font-ibm"
      >
        {/* 컨테이너 */}
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* 헤더 섹션 */}
          <motion.div
            className="mb-10 md:mb-20 max-w-5xl mx-auto"
            variants={itemVariants}
          >
            <div className="flex flex-col space-y-3 md:space-y-6">
              {/* 왼쪽 제목 영역 */}
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-4xl md:text-6xl font-bold text-sky-600 font-gmarket">
                  About Us
                </h2>
              </div>

              {/* 오른쪽 설명 영역 */}
              <div className="md:w-1/2">
                <motion.div
                  className="text-xl md:text-3xl text-gray-700 leading-relaxed font-medium"
                  variants={itemVariants}
                >
                  <div className="flex flex-col space-y-1">
                    <p>모든 산업에 가치를 더하는 인공지능</p>
                  </div>
                  <p className="text-lg md:text-xl text-gray-500 mt-6 leading-relaxed">
                    각 산업의 니즈에 최적화된 AI 솔루션을 통해
                    <br />더 효율적이고 스마트한 비즈니스를 만들어갑니다.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 통계 섹션 - 3개의 카드로 주요 지표 표시 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* 팀 멤버 통계 카드 */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md shadow-indigo-100 transform transition-all hover:scale-105 hover:shadow-lg"
              variants={statsVariants}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <Counter end={40} title="Team Members" /> {/* 멤버 수 카운터 */}
            </motion.div>

            {/* 성공률 통계 카드 */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md shadow-indigo-100 transform transition-all hover:scale-105 hover:shadow-lg"
              variants={statsVariants}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                  <ChartBar className="w-8 h-8 text-sky-600" />
                </div>
              </div>
              <Counter end={95} title="Success Rate" /> {/* 성공률 카운터 */}
            </motion.div>

            {/* AI 프로젝트 통계 카드 */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md shadow-indigo-100 transform transition-all hover:scale-105 hover:shadow-lg"
              variants={statsVariants}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              <Counter end={250} title="AI Projects" />{" "}
              {/* AI 프로젝트 수 카운터 */}
            </motion.div>
          </motion.div>

          {/* 파트너사 섹션 */}
          <motion.div className="mt-10 md:mt-20" variants={itemVariants}>
            {/* 파트너사 제목 영역 */}
            <div className="text-center mb-5 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 font-gmarket">
                Our Partners
              </h3>
              <p className="text-lg md:text-xl font-medium text-gray-500">
                함께 성장하는 파트너사
              </p>
              <div className="h-1 w-16 bg-sky-400 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* 파트너사 로고 컨테이너 - 외부 테두리에 애니메이션 효과 적용 */}
            <motion.div
              className="relative bg-blue-500 rounded-xl p-0.5 shadow-xl"
              whileInView={{
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // 처음 그림자
                  "0 20px 25px -5px rgba(99, 102, 241, 0.2), 0 10px 10px -5px rgba(99, 102, 241, 0.1)", // 중간에 강해지는 그림자
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // 다시 처음 그림자로
                ],
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY, // 무한 반복
                  repeatType: "reverse", // 역방향으로 반복
                },
              }}
            >
              {/* 파트너사 로고 배경 */}
              <div className="bg-white rounded-xl">
                {/* 파트너사 로고 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 px-4">
                  {/* 파트너사 로고 아이템 - 반복 생성 */}
                  {["협력사 1", "협력사 2", "협력사 3", "협력사 4"].map(
                    (partner, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center p-4 opacity-70 hover:opacity-100 transition-all"
                        whileHover={{ scale: 1.05 }} // 호버 시 크기 확대 애니메이션
                      >
                        {/* 로고 플레이스홀더 */}
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                          <span className="text-gray-500 text-xs">Logo</span>
                        </div>
                        {/* 파트너사 이름 */}
                        <span className="text-gray-800 font-medium">
                          {partner}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
