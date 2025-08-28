"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ServiceSection() {
  const [selectedService, setSelectedService] = useState("leanai"); // 선택된 서비스 상태
  const router = useRouter(); // 라우팅을 위한

  // 서비스별 설명, 기능, 스타일 등 정의
  const serviceContent = {
    leanai: {
      name: "LEAN-AI",
      title: "AI 학습용 데이터셋 구축 솔루션 '린에이아이'",
      desc: "AI 모델 성능 향상을 위한 고품질 데이터셋을 맞춤형으로 제공합니다.",
      icon: <BrainCircuit className="w-6 h-6" />,
      color: "from-cyan-300 to-sky-400",
      features: ["맞춤형 데이터 수집", "AI 라벨링", "품질 검수"],
    },
    mumul: {
      name: "MUMUL",
      title: "AI 챗봇 솔루션 '무물'",
      desc: "무물은 고객 문의를 자동으로 처리하는 AI 챗봇 서비스입니다.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-500",
      features: ["맞춤형 챗봇 구축", "24시간 자동 응대", "대화 데이터 분석"],
    },
  };

  // 전체 컨테이너 애니메이션 설정
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // 항목별 등장 애니메이션
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="services"
      className="py-10 md:py-20 bg-gradient-to-b from-sky-50 to-sky-100 w-full overflow-hidden font-ibm"
    >
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* 섹션 제목 및 설명 */}
        <motion.div
          className="mb-10 md:mb-20 max-w-5xl mx-auto"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row md:items-start md:space-x-12">
            {/* 타이틀 */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-4xl md:text-6xl font-bold text-sky-600 font-gmarket">
                Our Services
              </h2>
            </div>

            {/* 설명 */}
            <div className="md:w-1/2">
              <motion.div
                className="text-xl md:text-3xl text-gray-700 leading-relaxed"
                variants={itemVariants}
              >
                <div className="flex flex-col space-y-1">
                  <p>AI를 위한 데이터, AI로 이루는 소통</p>
                </div>
                <p className="text-lg md:text-xl text-gray-500 mt-6 leading-relaxed">
                  고품질 학습 데이터셋부터 맞춤형 AI 챗봇까지
                  <br />
                  기업의 AI 도입을 위한 통합 솔루션을 제공합니다.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 본문: 서비스 선택 및 설명 영역 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 좌측: 서비스 선택 버튼들 */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-4">
              {Object.keys(serviceContent).map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`w-full mb-2 p-3 rounded-lg flex items-center justify-between transition-all ${
                    selectedService === service
                      ? `bg-gradient-to-r ${serviceContent[service].color} text-white`
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        selectedService === service
                          ? "bg-white/20"
                          : "bg-gray-100"
                      }`}
                    >
                      {serviceContent[service].icon}
                    </div>
                    <span className="font-medium">
                      {service === "leanai" ? "린에이아이" : "무물"}
                    </span>
                  </div>
                  {selectedService === service && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 우측: 선택된 서비스 상세 설명 */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-xl p-6 shadow relative overflow-hidden border-l-4 ${
                  selectedService === "leanai"
                    ? "border-sky-400"
                    : "border-indigo-500"
                }`}
              >
                {/* 우측 하단 배경 SVG 데코 */}
                <div className="absolute bottom-0 right-0 w-40 h-40 opacity-5">
                  {selectedService === "leanai" ? (
                    <svg
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#00bcff"
                        d="M37.1,-42.4C50.5,-33.1,65.2,-23.6,66.5,-12.3C67.8,-1.1,55.6,12,45.4,23C35.3,34.1,27.1,43.2,16,49.8C4.8,56.4,-9.4,60.7,-20.7,56.7C-32.1,52.7,-40.5,40.5,-51.6,27C-62.6,13.6,-76.2,-1.1,-78.1,-17.9C-80.1,-34.8,-70.5,-53.7,-55.6,-62.8C-40.6,-71.9,-20.3,-71.1,-4.2,-66.1C11.9,-61.1,23.8,-51.8,37.1,-42.4Z"
                        transform="translate(100 100) rotate(180)"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#818CF8"
                        d="M37.1,-42.4C50.5,-33.1,65.2,-23.6,66.5,-12.3C67.8,-1.1,55.6,12,45.4,23C35.3,34.1,27.1,43.2,16,49.8C4.8,56.4,-9.4,60.7,-20.7,56.7C-32.1,52.7,-40.5,40.5,-51.6,27C-62.6,13.6,-76.2,-1.1,-78.1,-17.9C-80.1,-34.8,-70.5,-53.7,-55.6,-62.8C-40.6,-71.9,-20.3,-71.1,-4.2,-66.1C11.9,-61.1,23.8,-51.8,37.1,-42.4Z"
                        transform="translate(100 100) rotate(270)"
                      />
                    </svg>
                  )}
                </div>

                {/* 타이틀 + 서비스 이름 뱃지 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
                  <div className="flex items-start sm:items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4 ${
                        selectedService === "leanai"
                          ? "bg-sky-500 bg-opacity-10 text-sky-600"
                          : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {serviceContent[selectedService].icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                      {serviceContent[selectedService].title.split("'")[0]}
                      <span
                        className={
                          selectedService === "leanai"
                            ? "text-sky-500"
                            : "text-indigo-600"
                        }
                      >
                        '{serviceContent[selectedService].title.split("'")[1]}'
                      </span>
                    </h3>
                  </div>
                  <div
                    className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
                      selectedService === "leanai"
                        ? "bg-sky-500 bg-opacity-10 text-sky-600"
                        : "text-indigo-600 bg-indigo-50"
                    }`}
                  >
                    {serviceContent[selectedService].name}
                  </div>
                </div>

                {/* 설명 */}
                <div className="mb-6 text-gray-600 border-b border-gray-100 pb-6">
                  {serviceContent[selectedService].desc}
                </div>

                {/* 기능 리스트 */}
                <div className="mb-6">
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3 font-medium">
                    주요 기능
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {serviceContent[selectedService].features.map(
                      (feature, index) => (
                        <div
                          key={index}
                          className={`py-1.5 px-3 rounded-full text-sm ${
                            selectedService === "leanai"
                              ? "bg-sky-500 bg-opacity-10 text-sky-600"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          {feature}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* 버튼: 자세히 보기 */}
                <button
                  className={`mt-2 transition-colors py-2 px-5 rounded-lg text-sm font-medium flex items-center ${
                    selectedService === "leanai"
                      ? "bg-sky-400 hover:bg-sky-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                  onClick={() =>
                    router.push(`/solution?tab=${selectedService}`)
                  }
                >
                  <span>자세히 보기</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
