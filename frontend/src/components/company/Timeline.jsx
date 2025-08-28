"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Spinner from "@/components/ui/Spinner";

const CompanyHistory = () => {
  const [timeline, setTimeline] = useState([]); // 타임라인 데이터를 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const timelineRef = useRef(null); // 타임라인 컨테이너 ref

  // 페이지 마운트 시 JSON 파일에서 데이터 가져오기
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      // history, business, award JSON 파일을 병렬로 가져옴
      const [historyRes, businessRes, awardRes] = await Promise.all([
        fetch("/data/history.json").then((res) => res.json()),
        fetch("/data/business.json").then((res) => res.json()),
        fetch("/data/award.json").then((res) => res.json()),
      ]);

      // 모든 데이터 합치기
      const all = [...historyRes, ...businessRes, ...awardRes];

      // 연도 기준 내림차순 정렬
      const sorted = all.sort((a, b) => parseInt(b.year) - parseInt(a.year));

      // 연도별로 데이터 그룹핑
      const groupedByYear = {};
      sorted.forEach((item) => {
        if (!groupedByYear[item.year]) {
          groupedByYear[item.year] = [];
        }
        groupedByYear[item.year].push(item.content);
      });

      // 그룹핑된 데이터를 배열 형태로 변환
      const timelineData = Object.entries(groupedByYear)
        .map(([year, items]) => ({ year, items }))
        .sort((a, b) => parseInt(b.year) - parseInt(a.year));

      setTimeline(timelineData); // 최종 타임라인 state에 저장
      setIsLoading(false);
    }

    fetchData();
  }, []);

  // 특정 연도로 스크롤 이동
  const scrollToYear = (year) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // 타임라인 카드의 그라데이션 컬러 패턴
  const cardColors = [
    "from-sky-300 to-sky-400",
    "from-blue-300 to-blue-400",
    "from-blue-400 to-blue-500",
  ];

  return (
    <div className="relative overflow-hidden py-6 md:py-12 px-4 md:px-8 font-ibm">
      {/* 상단 타이틀 영역 */}
      <div className="text-center relative z-10 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold"
        >
          <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 bg-clip-text text-transparent mb-4 font-gmarket">
            COMPANY HISTORY
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-gray-600 max-w-xl mx-auto text-base md:text-xl font-medium mt-3"
        >
          LEAN-AI는 이렇게 성장해왔습니다.
        </motion.p>
      </div>

      {/* 연도 퀵 네비게이션 버튼 */}
      {!isLoading && timeline.length > 0 && (
        <div className="w-full flex justify-center items-center">
          <div className="backdrop-blur-sm z-20 mb-8 py-2 px-2 md:px-4 max-w-6xl w-full">
            <div className="flex flex-wrap justify-center gap-2">
              {timeline.map((item) => (
                <button
                  key={item.year}
                  onClick={() => scrollToYear(item.year)}
                  className="px-3 py-1.5 bg-white/80 hover:bg-blue-300 text-gray-700 hover:text-white rounded-lg text-sm md:text-base font-medium transition-all hover:shadow-md whitespace-nowrap font-gmarket"
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto relative">
        {/* 로딩 스피너 */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          <div className="relative" ref={timelineRef}>
            {/* 중앙선 (데스크탑 전용) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 via-sky-400 to-sky-300 hidden md:block"></div>

            {/* 타임라인 항목들 */}
            <div className="space-y-12">
              {timeline.map((yearData, index) => {
                const colorIndex = index % cardColors.length;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={yearData.year}
                    id={`year-${yearData.year}`}
                    className="relative"
                  >
                    {/* 모바일 연도 표시 */}
                    <div className="md:hidden">
                      <div className="flex items-center mb-4">
                        <div
                          className={`text-xl font-bold py-2 px-4 rounded-full bg-gradient-to-r ${cardColors[colorIndex]} text-white shadow-lg font-gmarket`}
                        >
                          {yearData.year}
                        </div>
                        <div className="h-0.5 flex-grow ml-3 bg-gradient-to-r from-sky-400 to-transparent"></div>
                      </div>
                    </div>

                    {/* 데스크탑 타임라인 카드 */}
                    <div className="hidden md:flex justify-center items-start relative">
                      {/* 연도 원 마커 */}
                      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 z-10">
                        <div
                          className={`w-10 h-2 rounded-full flex items-center justify-center bg-gradient-to-r ${cardColors[colorIndex]} text-white font-bold shadow-lg`}
                        ></div>
                      </div>

                      {/* 좌/우 카드 */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`w-1/2 ${isEven ? "mr-auto pr-12" : "ml-auto pl-12"}`}
                      >
                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 relative hover:shadow-xl transition-all">
                          {/* 연도 헤더 */}
                          <div className="mb-4 flex justify-between items-center">
                            <h3
                              className={`text-2xl font-bold bg-gradient-to-r text-gray-600`}
                            >
                              {yearData.year}
                            </h3>
                            <span className="text-xs bg-stone-100 text-gray-600 rounded-full px-3 py-1">
                              {yearData.items.length}개 이벤트
                            </span>
                          </div>

                          {/* 컬러 바 */}
                          <div
                            className={`h-1 w-full rounded-full bg-gradient-to-r ${cardColors[colorIndex]} mb-4`}
                          />

                          {/* 이벤트 리스트 */}
                          <ul className="space-y-3">
                            {yearData.items.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 + 0.2 }}
                                className="pl-4 border-l-2 border-sky-100 hover:border-sky-400 transition-colors py-1"
                              >
                                <p className="text-gray-700">{item}</p>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>

                    {/* 모바일 카드 구성 */}
                    <div className="md:hidden">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                      >
                        <div
                          className={`h-1 w-full rounded-full bg-gradient-to-r ${cardColors[colorIndex]} mb-4`}
                        />
                        <ul className="space-y-3">
                          {yearData.items.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                              className="pl-4 border-l-2 border-sky-100 py-1"
                            >
                              <p className="text-gray-700">{item}</p>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 하단 마커 */}
            <div className="flex justify-center mt-12">
              <div className="w-4 h-4 bg-sky-500 rounded-full opacity-50"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyHistory;
