import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import Navbar from "@/components/common/Navbar";
import CustomCursor from "@/components/common/CustomCursor";
import LeanAISection from "@/components/solution/Lean-ai";
import MumulSection from "@/components/solution/Mumul";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDownCircle,
  ChevronRight,
  CheckCircle,
  Award,
  BarChart2,
  ClipboardList,
  Bot,
  FileText,
  BarChart3,
} from "lucide-react";
import Footer from "@/components/common/Footer";
import NewsletterButton from "@/components/common/NewsletterButton";
import ScrollToTopButton from "@/components/common/ScrollTopButton";

export default function SolutionPage() {
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  const validTabs = ["leanai", "mumul"];
  const initialTab = validTabs.includes(tabFromQuery) ? tabFromQuery : "leanai";
  const [activeTab, setActiveTab] = useState(initialTab);
  const isMobile = useIsMobile(); // 모바일 화면 여부
  const [flipping, setFlipping] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    if (tabFromQuery && validTabs.includes(tabFromQuery)) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  useEffect(() => {
    // Staggered appearance for features
    if (!flipping) {
      const timer = setInterval(() => {
        setVisibleFeatures((prev) => (prev < 3 ? prev + 1 : prev));
      }, 200);
      return () => clearInterval(timer);
    } else {
      setVisibleFeatures(0);
    }
  }, [flipping, activeTab]);

  const handleTabChange = (tabKey) => {
    if (activeTab === tabKey || flipping) return;

    setFlipping(true);
    setVisibleFeatures(0);

    setTimeout(() => {
      setActiveTab(tabKey);
      setTimeout(() => {
        setFlipping(false);
      }, 500);
    }, 500);
  };

  const tabs = [
    {
      key: "leanai",
      label: "린에이아이",
      description: "정부 바우처 기반 AI·데이터 기업 맞춤형 솔루션",
      longDescription:
        "정부 지원 사업 및 데이터/AI 바우처를 활용한 기업 맞춤 솔루션",
      gradient: "from-sky-400 via-blue-500 to-blue-600",
      lightGradient: "from-sky-50 to-blue-50",
      subtleGradient: "from-blue-500/5 to-sky-500/5",
      accentColor: "#0ea5e9",
      darkAccent: "#0284c7",
      hoverColor: "rgba(14, 165, 233, 0.05)",
      features: [
        {
          icon: <Award className="w-4 h-4 md:w-5 md:h-5" />, // 실적, 수상 경력 느낌 강조
          text: "데이터·AI 바우처 사업 수행 5년 연속",
          detail: "누적 200건 이상, 검증된 사업 운영 경험 보유",
        },
        {
          icon: <BarChart2 className="w-4 h-4 md:w-5 md:h-5" />, // 데이터 분석, 시각화 상징
          text: "기업 맞춤형 데이터 활용 전략",
          detail: "데이터 수집, 정제, 분석까지 전 과정 지원",
        },
        {
          icon: <ClipboardList className="w-4 h-4 md:w-5 md:h-5" />, // 정부과제 전 주기 관리 상징
          text: "정부 지원 사업 A to Z",
          detail: "컨설팅, 과제 기획, 수행, 성과보고까지 원스톱 서비스",
        },
      ],
    },
    {
      key: "mumul",
      label: "무물",
      description: "AI FAQ 챗봇 및 고객 응대 자동화 솔루션",
      longDescription:
        "맞춤형 AI FAQ 챗봇을 제공하며, 문서 관리, 민원 처리 등 다양한 기능을 지원하는 스마트 고객 응대 플랫폼",
      gradient: "from-indigo-400 via-violet-500 to-purple-600",
      lightGradient: "from-indigo-50 to-violet-50",
      subtleGradient: "from-indigo-500/5 to-violet-500/5",
      accentColor: "#6366f1",
      darkAccent: "#4f46e5",
      hoverColor: "rgba(99, 102, 241, 0.05)",
      features: [
        {
          icon: <Bot className="w-4 h-4 md:w-5 md:h-5" />, // 챗봇 전용 아이콘
          text: "맞춤형 AI 챗봇",
          detail:
            "고객 유형(소상공인/기업/관공서)에 따른 응답 방식 커스터마이징",
        },
        {
          icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />, // 문서 검색/관리
          text: "문서 및 법률 검색",
          detail: "기본 문서 서식 제공과 조례/법률 기반 질의응답 기능",
        },
        {
          icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />, // 분석/통계 시각화
          text: "데이터 분석 및 통계",
          detail:
            "고객 문의·리뷰 데이터를 바탕으로 통계 시각화 및 인사이트 제공",
        },
      ],
    },
  ];

  // 현재 선택된 탭 정보
  const currentTab = tabs.find((tab) => tab.key === activeTab);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden">
      {/* 배경*/}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white to-sky-100"
          style={{ transform: `translateY(${backgroundY})` }}
          animate={{
            background:
              activeTab === "leanai"
                ? "linear-gradient(to bottom, #f0f9ff, #bae6fd)" // 연하늘 ~ 하늘
                : "linear-gradient(to bottom, #eef2ff, #c7d2fe)", // 연보라 ~ 보라
          }}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
        />

        {/* 모바일에서는 복잡한 패턴 없애기 */}
        {!isMobile && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="smallGrid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.01)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <pattern
                  id="grid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="80" height="80" fill="url(#smallGrid)" />
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.02)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* 색상 강화된 그라데이션 블러 */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-3xl"
          animate={{
            backgroundColor:
              activeTab === "leanai"
                ? "rgba(186, 230, 253, 0.7)" // 불투명도 증가
                : "rgba(199, 210, 254, 0.7)",
            scale: isMobile ? 1 : [1, 1.05, 1],
            opacity: isMobile ? 0.6 : [0.6, 0.75, 0.6],
          }}
          transition={{
            backgroundColor: { duration: isMobile ? 0.5 : 0.8 },
            scale: isMobile
              ? {}
              : { repeat: Infinity, duration: 8, ease: "easeInOut" },
            opacity: isMobile
              ? {}
              : { repeat: Infinity, duration: 8, ease: "easeInOut" },
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          animate={{
            backgroundColor:
              activeTab === "leanai"
                ? "rgba(224, 242, 254, 0.7)"
                : "rgba(224, 231, 255, 0.7)",
            opacity: isMobile ? 0.6 : [0.6, 0.7, 0.6],
          }}
          transition={{
            backgroundColor: { duration: isMobile ? 0.5 : 0.8 },
            opacity: isMobile
              ? {}
              : { repeat: Infinity, duration: 10, ease: "easeInOut" },
          }}
        />

        {/* 추가 배경 블러 요소 */}
        <motion.div
          className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full blur-3xl"
          animate={{
            backgroundColor:
              activeTab === "leanai"
                ? "rgba(125, 211, 252, 0.6)" // 하늘색 계열
                : "rgba(167, 139, 250, 0.6)", // 보라색 계열
            opacity: isMobile ? 0.5 : [0.5, 0.6, 0.5],
          }}
          transition={{
            backgroundColor: { duration: isMobile ? 0.5 : 0.8 },
            opacity: isMobile
              ? {}
              : { repeat: Infinity, duration: 6, ease: "easeInOut" },
          }}
        />
      </div>

      <Navbar activeTab={activeTab} />
      {!isMobile && <CustomCursor />}

      <div
        ref={containerRef}
        className={`relative overflow-hidden 
                    ${
                      activeTab === "leanai"
                        ? "bg-cyan-50/30"
                        : "bg-violet-50/10"
                    }  
        `}
      >
        {/* Hero Section */}
        <section className="relative min-h-screen mt-20 p-5 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 max-w-6xl mx-auto w-full"
          >
            <div className="text-center mb-10">
              <motion.h2
                className={`text-5xl md:text-6xl mb-6 bg-gradient-to-r ${
                  activeTab === "leanai"
                    ? "from-sky-400 to-sky-600"
                    : "from-indigo-300 to-indigo-600"
                } bg-clip-text text-transparent font-gmarket font-bold`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Services
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-gray-500 text-lg md:text-xl font-ibm font-regular whitespace-pre-line tracking-tight "
              >
                {activeTab === "leanai" ? (
                  <>
                    다양한 산업에 특화된 <br className="block md:hidden" /> {""}
                    데이터 수집, 전처리, 라벨링 프로세스를 통해
                    <br />
                    고품질 학습 데이터를 제공합니다.
                  </>
                ) : (
                  <>
                    비즈니스에 맞는 최적의 AI 모델을 설계하고,
                    <br className="block md:hidden" /> {""}
                    쉽게 AI를 업무에 적용할 수 있도록 지원하여
                    <br />
                    비즈니스 경쟁력을 높이는 데 기여합니다.
                  </>
                )}
              </motion.p>
            </div>

            {/* 세련된 3D Card Flip Animation - 모바일 최적화, 높이 조정 및 컬러풀한 블러 */}
            <div className="max-w-lg mx-auto perspective">
              <div className={`flip-container ${flipping ? "flipping" : ""}`}>
                <div className="flip-card relative">
                  {/* Front side - current tab, 컬러풀하게 개선 */}
                  <div className="flip-front p-5 rounded-2xl md:rounded-3xl overflow-hidden bg-white/90">
                    {/* Glass Effect Card Highlight with color */}
                    <div className="absolute -inset-px rounded-2xl md:rounded-3xl overflow-hidden z-0">
                      <div
                        className="absolute inset-0 bg-gradient-to-tr opacity-90"
                        style={{
                          background: `linear-gradient(to top right, 
                            ${
                              activeTab === "leanai"
                                ? "rgba(255, 255, 255, 0.9), rgba(186, 230, 253, 0.3), rgba(255, 255, 255, 0.8)"
                                : "rgba(255, 255, 255, 0.9), rgba(199, 210, 254, 0.3), rgba(255, 255, 255, 0.8)"
                            })`,
                        }}
                      ></div>
                    </div>

                    {/* Color tint overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: `radial-gradient(circle at top right, 
                          ${
                            activeTab === "leanai"
                              ? "rgba(14, 165, 233, 0.7), transparent 70%"
                              : "rgba(99, 102, 241, 0.7), transparent 70%"
                          })`,
                      }}
                    ></div>

                    {/* Inner card glow for depth */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-24 opacity-10"
                      style={{
                        background: `linear-gradient(to top, 
                          ${
                            activeTab === "leanai"
                              ? "rgba(14, 165, 233, 0.5), transparent"
                              : "rgba(99, 102, 241, 0.5), transparent"
                          })`,
                      }}
                    ></div>

                    {/* Original shadow */}
                    <div
                      className="absolute inset-0 shadow-xl rounded-2xl md:rounded-3xl"
                      style={{
                        boxShadow: `0 20px 60px -20px ${currentTab.accentColor}40, 0 10px 30px -10px rgba(0,0,0,0.05)`,
                      }}
                    ></div>

                    {/* Subtle background pattern - Mobile에서는 화면 줄이기 */}
                    {!isMobile && (
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: `radial-gradient(${currentTab.accentColor}70 0.5px, transparent 0.5px)`,
                          backgroundSize: "25px 25px",
                        }}
                      ></div>
                    )}

                    {/* Main content container */}
                    <div className="relative z-10 font-ibm ">
                      {/* Top section - mobile 최적화 */}
                      <div className="flex items-start justify-between mb-4 md:mb-5">
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-lg md:text-xl shadow-lg bg-gradient-to-br ${currentTab.gradient} transform -rotate-3`}
                            style={{
                              boxShadow: `0 10px 30px -5px ${currentTab.accentColor}50`,
                            }}
                          ></div>

                          <div className="ml-3 md:ml-5">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-0 md:mb-1">
                              {currentTab.label}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500">
                              {currentTab.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Feature list - 모바일에서 간격 줄이기 */}
                      <div className="mt-4 md:mt-5 space-y-1 md:space-y-2 ">
                        {currentTab.features.map((feature, idx) => (
                          <AnimatePresence key={idx}>
                            {visibleFeatures > idx && (
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={featureVariants}
                                className="flex items-center p-2 md:p-3 rounded-xl transition-all duration-300 hover:bg-white touch-action-manipulation"
                              >
                                <div
                                  className={`w-7 h-7 md:w-9 md:h-9 rounded-lg mr-3 md:mr-4 flex items-center justify-center bg-gradient-to-br ${currentTab.gradient} text-white shadow-sm`}
                                >
                                  {feature.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 text-sm md:text-lg">
                                    {feature.text}
                                  </div>
                                  <div className="text-xs md:text-sm text-gray-500">
                                    {feature.detail}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        ))}
                      </div>

                      {/* Solution selection buttons - 모바일에서 더 넓은 터치 타겟 */}
                      <div className="mt-4 md:mt-5 border-t border-gray-100 ">
                        <div className="text-xs md:text-sm font-medium text-gray-500 mb-3 md:mb-4">
                          다른 솔루션 선택
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tabs.map((tab) => (
                            <motion.button
                              key={tab.key}
                              whileHover={
                                !isMobile
                                  ? {
                                      y: -2,
                                      boxShadow: `0 6px 20px -5px ${tab.accentColor}20`,
                                    }
                                  : {}
                              }
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleTabChange(tab.key)}
                              disabled={tab.key === activeTab || flipping}
                              className={`
                                relative py-3 md:py-4 px-4 md:px-5 rounded-xl font-medium text-lg transition-all duration-300
                                flex items-center justify-between overflow-hidden bg-white
                                ${
                                  tab.key === activeTab
                                    ? ` border-2 border-${
                                        tab.key === "leanai" ? "sky" : "indigo"
                                      }-100`
                                    : "border border-gray-200 hover:border-gray-300"
                                }
                                touch-action-manipulation min-h-[3rem] md:min-h-[3.5rem]
                              `}
                              style={
                                tab.key === activeTab
                                  ? {
                                      borderColor: `${tab.accentColor}30`,
                                    }
                                  : {}
                              }
                            >
                              {/* Tab selection highlight line */}
                              {tab.key === activeTab && (
                                <div
                                  className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full"
                                  style={{
                                    background: `linear-gradient(to bottom, ${tab.accentColor}, ${tab.darkAccent})`,
                                  }}
                                ></div>
                              )}

                              <span className="flex items-center gap-2">
                                <span
                                  className={
                                    tab.key === activeTab
                                      ? `text-${
                                          tab.key === "leanai"
                                            ? "sky"
                                            : "indigo"
                                        }-700`
                                      : "text-gray-700"
                                  }
                                  style={
                                    tab.key === activeTab
                                      ? { color: tab.darkAccent }
                                      : {}
                                  }
                                >
                                  {tab.label}
                                </span>
                              </span>

                              {tab.key === activeTab ? (
                                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                              ) : (
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back side - 색상 강화된 로딩 상태 */}
                  <div className="flip-back md:p-12 rounded-2xl md:rounded-3xl bg-white/90 ">
                    {/* Enhanced glass effect on back */}
                    <div className="absolute -inset-px rounded-2xl md:rounded-3xl p-px overflow-hidden z-0 ">
                      <div
                        className="absolute inset-0 opacity-90"
                        style={{
                          background: `linear-gradient(135deg, 
                            ${
                              activeTab === "leanai"
                                ? "rgba(255, 255, 255, 0.9), rgba(186, 230, 253, 0.4)"
                                : "rgba(255, 255, 255, 0.9), rgba(199, 210, 254, 0.4)"
                            })`,
                        }}
                      ></div>
                    </div>

                    {/* Color halo on back */}
                    <div
                      className="absolute right-8 top-8 w-32 h-32 rounded-full opacity-20 blur-2xl"
                      style={{
                        background:
                          activeTab === "leanai"
                            ? "radial-gradient(circle, rgb(14, 165, 233), transparent 70%)"
                            : "radial-gradient(circle, rgb(99, 102, 241), transparent 70%)",
                      }}
                    ></div>

                    {/* Original shadow */}
                    <div
                      className="absolute inset-0 shadow-xl rounded-2xl md:rounded-3xl"
                      style={{
                        boxShadow: `0 20px 60px -20px ${currentTab.accentColor}40, 0 10px 30px -10px rgba(0,0,0,0.05)`,
                      }}
                    ></div>

                    <div className="h-full w-full flex flex-col items-center justify-center space-y-6 relative z-10 ">
                      {/* Animated loading state - 모바일에서 크기 줄이기 */}
                      <div className="relative">
                        <svg
                          className="w-12 h-12 md:w-16 md:h-16"
                          viewBox="0 0 50 50"
                        >
                          <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            strokeWidth="3"
                            stroke={`${currentTab.accentColor}30`}
                          />
                          <motion.circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            strokeWidth="3"
                            stroke={currentTab.accentColor}
                            strokeDasharray="126"
                            strokeDashoffset="126"
                            strokeLinecap="round"
                            animate={{
                              strokeDashoffset: [126, 0, 126],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: isMobile ? 1.2 : 1.5,
                              ease: "easeInOut",
                            }}
                          />
                        </svg>
                        <div
                          className="absolute inset-0 flex items-center justify-center text-lg md:text-xl"
                          style={{ color: currentTab.accentColor }}
                        >
                          {currentTab.icon}
                        </div>
                      </div>

                      <div className="text-center">
                        <motion.div
                          className="text-lg md:text-xl font-bold mb-2 bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(90deg, ${currentTab.accentColor}, ${currentTab.darkAccent})`,
                          }}
                          animate={{
                            backgroundPosition: [
                              "0% center",
                              "100% center",
                              "0% center",
                            ],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: isMobile ? 1.5 : 2,
                            ease: "easeInOut",
                          }}
                        >
                          {currentTab.label}
                        </motion.div>

                        <div className="text-xs md:text-sm text-gray-400">
                          불러오는 중...
                        </div>
                      </div>

                      <div className="flex gap-2 ">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                            style={{ backgroundColor: currentTab.accentColor }}
                            animate={{
                              opacity: [0.2, 1, 0.2],
                              scale: [0.8, 1, 0.8],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-10 md:mt-16 text-center"
            >
              <button className="animate-bounce text-gray-400 hover:text-gray-600 transition-colors">
                <ArrowDownCircle className="w-8 h-8 md:w-10 md:h-10" />
                <span className="sr-only">스크롤 다운</span>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Content Section with glass morphism effect */}
        <section className="relative z-10 px-6 md:px-24 py-5 md:py-10">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="tab-content"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
                  <div className={`absolute inset-0`}></div>
                </div>

                <div className="relative z-10">
                  {activeTab === "leanai" && <LeanAISection />}
                  {activeTab === "mumul" && <MumulSection />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
      <Footer className="" />

      <NewsletterButton activeTab={activeTab} />

      <ScrollToTopButton activeTab={activeTab} />

      <style jsx>{`
        .perspective {
          perspective: 1500px;
        }

        .flip-container {
          position: relative;
          width: 100%;
          height: ${isMobile ? "570px" : "520px"};
          transition: transform 0.01s;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform ${isMobile ? "0.6s" : "0.8s"}
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .flipping .flip-card {
          transform: rotateY(180deg);
        }

        .flip-front,
        .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-back {
          transform: rotateY(180deg);
        }

        .tab-content {
          position: relative;
          min-height: ${isMobile ? "350px" : "400px"};
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-radius: ${isMobile ? "16px" : "24px"};
          overflow: hidden;
        }

        /* Prevent flash issues on rotation in mobile */
        @media (max-width: 767px) {
          .flip-front,
          .flip-back {
            transform: translateZ(1px);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -webkit-transform: translateZ(1px) rotateY(0deg);
          }

          .flip-back {
            transform: translateZ(1px) rotateY(180deg);
            -webkit-transform: translateZ(1px) rotateY(180deg);
          }

          /* Fix for iOS Safari */
          .flipping .flip-card {
            -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
          }
        }

        /* 터치 최적화 클래스 */
        .touch-action-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}