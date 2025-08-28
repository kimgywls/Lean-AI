"use client";

import { useState, useRef, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Award,
  Archive,
  CheckCircle2,
  Gift,
  Crosshair,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  FileSearch,
  Star,
  BotMessageSquare,
  Route,
  MessageSquareQuote,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ChatbotDeploymentProcessPC from "@/components/solution/ChatBotDeploymentProcess/ChatbotDeploymentProcessPC";
import ChatbotDeploymentProcessMobile from "@/components/solution/ChatBotDeploymentProcess/ChatbotDeploymentProcessMobile";
import ChatbotBuildProcessPC from "@/components/solution/ChatbotBuildProcess/ChatbotBuildProcessPC";
import ChatbotBuildProcessMobile from "@/components/solution/ChatbotBuildProcess/ChatbotBuildProcessMobile";
import InquiryModal from "@/components/modal/inquiry/InquiryModal";
import SuccessModal from "@/components/modal/common/SuccessModal";
import ErrorModal from "@/components/modal/common/ErrorModal";

const Mumul = () => {
  const isMobile = useIsMobile(); // 모바일 화면 여부
  const [activeTab, setActiveTab] = useState("features");
  const [activeFeature, setActiveFeature] = useState(null);
  const [iquiryModalOpen, setIquiryModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const containerRef = useRef(null);
  const visibleCount = 4;
  const allTags = [
    "FAQ 자동 응답",
    "고객 CS 챗봇",
    "사내 정보 챗봇",
    "문서 기반 QnA",
    "민원 접수 처리",
    "고객 리뷰 아카이빙",
    "데이터 기반 인사이트",
    "음성 인식(STT)",
    "챗봇 통계 분석",
    "댓글 응대 자동화",
  ];

  const [showAllTags, setShowAllTags] = useState(false);
  const tagsToDisplay =
    isMobile && !showAllTags ? allTags.slice(0, visibleCount) : allTags;

  const tabVariants = {
    inactive: { opacity: 0.6 },
    active: { opacity: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, y: -20 },
  };

  const features = [
    {
      id: "target-specific",
      icon: <Crosshair className="w-5 h-5" />,
      title: "산업별 맞춤형 솔루션",
      description:
        "소상공인, 기업, 관공서 등 고객 유형별 맞춤형 AI 챗봇 솔루션을 제공합니다.",
      details:
        "소상공인용으로는 단순 응대 중심의 1:1 FAQ 챗봇을, 기업용으로는 고객 CS 응대 및 사내 정보 질의응답 챗봇을, 관공서용으로는 민원 접수 및 처리 관리 시스템까지 각 산업군에 최적화된 AI 솔루션을 제공합니다.",
    },
    {
      id: "document-management",
      icon: <FileSearch className="w-5 h-5" />,
      title: "문서 관리 시스템",
      description:
        "기업와 관공서를 위한 효율적인 문서 관리 및 검색 기능을 제공합니다.",
      details:
        "기본 서식 제공은 물론, 검색 기능을 통해 필요한 문서를 빠르게 찾고 관리할 수 있습니다. 기업 내부 문서화 및 관공서의 행정 문서 처리 효율을 크게 향상시킵니다.",
    },
    {
      id: "customized-service",
      icon: <MessageSquareQuote className="w-5 h-5" />,
      title: "고급 RAG 기반 답변 시스템",
      description:
        "LangGraph 기반 문서 질의응답 시스템으로 신뢰도 높은 답변을 제공합니다.",
      details:
        "사용자 질문의 흐름을 이해하고 관련 정보를 유기적으로 연결하여, 보다 정확하고 풍부한 답변을 제공합니다. 멀티턴 대화 방식을 통해 이전 질문의 맥락도 반영함으로써 자연스럽고 일관된 응답이 가능합니다.",
    },
    {
      id: "data-archiving",
      icon: <Archive className="w-5 h-5" />,
      title: "고객 문의 및 리뷰 아카이빙",
      description:
        "모든 고객 문의와 리뷰 데이터를 저장하여 인사이트 도출과 서비스 개선에 활용합니다.",
      details:
        "고객의 문의와 리뷰 데이터를 자동으로 수집하고 정리하여 통합 아카이빙합니다. 축적된 데이터를 기반으로 고객의 니즈와 불편 사항을 분석할 수 있으며, 이를 통해 서비스 개선과 운영 전략 수립에 활용할 수 있습니다.",
    },
  ];

  const benefits = [
    "반복 질문에 대한 자동 대응을 통한 업무 효율 향상 및 응대 시간 절감",
    "산업별 특성에 맞는 맞춤형 AI 솔루션으로 업무 효율성 극대화",
    "RAG 기반 고급 답변 시스템으로 복잡한 질문에도 정확한 정보 제공",
    "문서 관리 및 검색 기능으로 중요 정보에 빠르게 접근 가능",
    "고객 문의 데이터 아카이빙으로 서비스 품질 지속적 개선",
  ];

  const tabs = [
    { id: "features", label: "주요 특징", icon: <Star className="w-5 h-5" /> },
    {
      id: "process",
      label: "AI 챗봇",
      icon: <Route className="w-5 h-5" />,
    },
    { id: "benefits", label: "도입 혜택", icon: <Gift className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full rounded-3xl border border-indigo-300 bg-white shadow-lg px-4 py-8 sm:p-10  overflow-y-auto font-ibm">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-10"
          >
            <div className="inline-flex items-center mb-4 px-3 py-1.5 bg-indigo-100 border border-indigo-200 rounded-full text-sm sm:text-base">
              <Rocket
                className="w-4 h-4 text-indigo-500 mr-2"
                strokeWidth={1.5}
              />
              <span className="text-indigo-700 font-medium">무물 솔루션</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 font-gmarket">
                Mumul
              </span>
            </h2>
            <p className="text-gray-700 max-w-3xl text-base md:text-lg">
              무물은 고객사 유형에 맞춘 AI 챗봇 솔루션으로,{" "}
              <br className="hidden md:block" />
              단순한 FAQ 응답을 넘어 고객 문의 처리와 내부 업무 자동화를 돕는
              스마트한 챗봇 플랫폼입니다.
            </p>
          </motion.div>

          {/* Desktop Tabs */}
          <div className="hidden sm:inline-flex flex-wrap p-1.5 bg-gray-100 rounded-full border border-gray-200 gap-2 mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial="inactive"
                animate={activeTab === tab.id ? "active" : "inactive"}
                variants={tabVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full flex items-center text-base ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-400 to-violet-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                } transition-all duration-300`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Tabs - Icons Only with Smaller Size */}
          <div className="sm:hidden flex justify-center p-1 bg-gray-100 rounded-full border border-gray-200 mb-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial="inactive"
                animate={activeTab === tab.id ? "active" : "inactive"}
                variants={tabVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 mx-1 rounded-full flex items-center justify-center ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-400 to-violet-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                } transition-all duration-300`}
                aria-label={tab.label}
              >
                <div className="text-lg">{tab.icon}</div>
                {activeTab === tab.id && (
                  <span className="ml-1 text-xs font-medium">{tab.label}</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <div ref={containerRef} className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "features" && (
                <motion.div
                  key="features"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  <h3 className="text-2xl md:text-xl font-semibold mb-6 text-gray-800 inline-flex items-center">
                    주요 특징
                    <Star className="ml-2 w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {features.map((feature) => (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.03 }}
                        onClick={() =>
                          setActiveFeature(
                            feature.id === activeFeature ? null : feature.id
                          )
                        }
                        className={`group p-3 md:p-5 rounded-2xl border backdrop-blur-md cursor-pointer transition-colors duration-300 ${
                          activeFeature === feature.id
                            ? "bg-gradient-to-br from-indigo-100 to-violet-100 border-indigo-300"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div
                              className={`p-2 bg-white text-indigo-500 rounded-lg mr-1.5 md:mr-3 transition-colors duration-300`}
                            >
                              {feature.icon}
                            </div>
                            <h4 className="font-semibold md:text-lg text-base whitespace-nowrap text-gray-800">
                              {feature.title}
                            </h4>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                              activeFeature === feature.id
                                ? "bg-indigo-500"
                                : "bg-gray-200"
                            }`}
                          >
                            {activeFeature === feature.id ? (
                              <ChevronRight className="w-3 h-3 text-white transform rotate-90" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-gray-500" />
                            )}
                          </div>
                        </div>
                        <p
                          className={`text-gray-600 text-base transition-all duration-300 ${
                            activeFeature === feature.id ? "mb-3" : ""
                          }`}
                        >
                          {feature.description}
                        </p>

                        {activeFeature === feature.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 whitespace-pre-line"
                          >
                            {feature.details}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 md:p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50"
                  >
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
                      <h3 className="font-semibold text-xl md:text-2xl text-gray-800">
                        무물이 제공하는 서비스
                      </h3>
                    </div>

                    <p className="text-gray-700 mb-5 text-sm md:text-base">
                      무물은 다양한 산업군에 특화된 AI 챗봇 솔루션으로, 반복적인
                      질문에 대한 자동 응답은 물론 문서 기반 질의응답(RAG), 고객
                      문의 및 리뷰 아카이빙 기능을 제공합니다. <br /> 이를 통해
                      고객 서비스 품질을 높이고, 내부 업무 효율성을
                      극대화합니다.
                    </p>

                    <AnimatePresence initial={false}>
                      {(isMobile || showAllTags) && (
                        <motion.div
                          key="tags"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.1, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
                            {tagsToDisplay.map((tech, index) => (
                              <div
                                key={index}
                                className="px-2 md:px-3 py-1 bg-indigo-100 text-indigo-600 text-xs md:text-sm rounded-full border border-indigo-200 text-center"
                              >
                                {tech}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 더보기 / 접기 버튼 */}
                    {isMobile && (
                      <button
                        onClick={() => setShowAllTags(!showAllTags)}
                        className="text-sm text-indigo-600 hover:underline flex items-center mt-2"
                      >
                        {showAllTags ? "접기" : "더보기"}
                        {showAllTags ? (
                          <ChevronUp className="w-4 h-4 ml-1 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300" />
                        )}
                      </button>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "process" && (
                <motion.div
                  key="process"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  <h3 className="font-semibold text-2xl md:text-3xl mb-6 text-gray-800 inline-flex items-center">
                    AI 챗봇 도입 절차
                    <Route className="ml-2 w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
                  </h3>
                  {/* PC용 */}
                  <ChatbotDeploymentProcessPC />
                  {/* 모바일용 */}
                  <ChatbotDeploymentProcessMobile />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 p-4 md:p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50"
                  >
                    <div className="flex items-center mb-4">
                      <BotMessageSquare className="w-6 h-6 md:w-8 md:h-8 text-indigo-500 mr-2" />
                      <h3 className="font-semibold text-xl md:text-2xl text-gray-800">
                        AI 챗봇 시작하기
                      </h3>
                    </div>

                    {/* PC용 */}
                    <ChatbotBuildProcessPC />
                    {/* 모바일용 */}
                    <ChatbotBuildProcessMobile />

                    <div className="mt-6 px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-gray-700 ">
                        무물 챗봇은 다양한 산업군과 조직 환경에 맞게
                        커스터마이징된 AI 응대 시스템을 제공합니다. <br /> 반복
                        질문 응대부터 내부 지식 관리까지, 실제 사용 환경에
                        최적화된 챗봇을 구축합니다.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "benefits" && (
                <motion.div
                  key="benefits"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 inline-flex items-center">
                    도입 혜택
                    <Gift className="ml-2 w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                        >
                          <div className="p-1 bg-indigo-100 text-indigo-500 rounded-full mr-3">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <p className="text-gray-700 text-base ">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 md:p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 flex flex-col justify-between h-full shadow-sm"
                    >
                      <div>
                        <div className="inline-flex items-center px-3 py-1 bg-white rounded-full mb-4 border border-gray-200 shadow-sm">
                          <Award className="w-4 h-4 text-indigo-500 mr-2" />
                          <span className="text-indigo-700 text-sm">
                            AI 솔루션 기업
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                          맞춤형 AI 챗봇의 새로운 기준
                        </h3>

                        <p className="text-gray-700 mb-8">
                          무물은 단순 반복 응대를 넘어 고객 경험을 혁신합니다.
                          <br className="hidden md:block " />각 산업의 고유한
                          특성을 반영한 맞춤형 AI 챗봇으로 업무 효율성을
                          극대화합니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <span className="text-gray-600">
                            반복 응대 자동화 기대율
                          </span>
                          <span className="text-violet-500 font-bold">
                            80%+
                          </span>
                        </div>

                        <button
                          onClick={() => setIquiryModalOpen(true)}
                          className="w-full p-4 bg-gradient-to-r from-violet-400 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center"
                        >
                          무물 서비스 문의하기
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-4 md:p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-sm"
                  >
                    <div className="flex items-center mb-4">
                      <BadgeCheck className="w-5 h-5 text-indigo-500 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-800">
                        차별화된 기술 포인트
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-gray-800 mb-3 font-semibold text-lg">
                          산업별 맞춤형 특화
                        </h4>
                        <ul className="space-y-2 text-gray-600 ">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                            소상공인: 1:1 밀착형 FAQ 챗봇
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                            기업: 내/외부 커뮤니케이션 최적화
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                            관공서: 민원 응대 효율성 극대화
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-gray-800 mb-3 font-semibold text-lg">
                          기술적 차별성
                        </h4>
                        <ul className="space-y-2 text-gray-600 ">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                            RAG 기반 심층 학습 모델
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                            이전 대화를 반영한 고도화된 응답
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                            지속적 학습 및 성능 최적화
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={iquiryModalOpen}
        onClose={() => setIquiryModalOpen(false)}
        onSubmit={() => setIquiryModalOpen(false)}
      />
    </div>
  );
};

export default Mumul;
