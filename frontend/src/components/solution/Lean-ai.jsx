"use client";

import { useState, useEffect, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Award,
  Users,
  CheckCircle2,
  Gift,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Eye,
  BrainCircuit,
  Star,
  Upload,
  UserCheck,
  ClipboardCheck,
  CheckSquare,
  AlertCircle,
  FileCog,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import DataVoucherProcessPC from "@/components/solution/DataVoucherProcess/DataVoucherProcessPC";
import DataVoucherProcessMobile from "@/components/solution/DataVoucherProcess/DataVoucherProcessMobile";
import InquiryModal from "@/components/modal/inquiry/InquiryModal";
import SuccessModal from "@/components/modal/common/SuccessModal";
import ErrorModal from "@/components/modal/common/ErrorModal";

const LeanAI = () => {
  const isMobile = useIsMobile(); // 모바일 화면 여부
  const [activeTab, setActiveTab] = useState("features");
  const [activeFeature, setActiveFeature] = useState(null);
  const [iquiryModalOpen, setIquiryModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const containerRef = useRef(null);
  const visibleCount = 4;
  const allTags = [
    "단순 텍스트",
    "QA 대화셋",
    "바운딩",
    "OCR",
    "태깅",
    "형태소 분석",
    "랜드마크",
    "라벨링",
    "음성전사",
    "상황별 수집",
    "영상 수집",
    "영상 추출",
    "대상별 수집",
    "외국어 수집",
    "태깅/라벨링",
    "랜드마크",
  ];

  const [showAllTags, setShowAllTags] = useState(false);
  const tagsToDisplay =
    isMobile && !showAllTags ? allTags.slice(0, visibleCount) : allTags;

  // Tab animation variants
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
      id: "data-collection",
      icon: <BrainCircuit className="w-5 h-5" />,
      title: "AI 학습용 데이터 수집/가공",
      description: "최고품질의 데이터를 최단기간에 제공하는 전문 서비스입니다.",
      details:
        "엄선된 작업자 풀을 바탕으로 AI 학습용 데이터셋을 수집/가공합니다. 라벨링 자동화 엔진을 통해 효율 높은 데이터 가공시스템을 구축했습니다.",
    },
    {
      id: "crowdsourcing-platform",
      icon: <TrendingUp className="w-5 h-5" />,
      title: "자체 크라우드 소싱 플랫폼",
      description:
        "300여명의 전문 작업자 POOL을 통한 빠르고 정확한 데이터 수집",
      details:
        "자체 크라우드 소싱 플랫폼 LEAN-AI에 소속된 명문대 출신 300여명의 작업자 POOL을 바탕으로 빠르고 정확한 데이터 수집이 가능합니다. 작업 희망자는 작업 신성, 테스트과제 작성 및 제출 후 승인 여부에 따라 참여합니다.",
    },
    {
      id: "professional-service",
      icon: <Users className="w-5 h-5" />,
      title: "전문 데이터 서비스",
      description:
        "다양한 유형의 데이터를 전문적으로 처리하는 맞춤형 서비스입니다.",
      details:
        "텍스트, 이미지, 오디오, 비디오 등 다양한 유형의 데이터를 전문적으로 수집/가공합니다. 수요기업에서 요청하는 형식으로 정리한 데이터셋을 제공합니다.",
    },
    {
      id: "proven-expertise",
      icon: <Eye className="w-5 h-5" />,
      title: "검증된 전문성",
      description:
        "2021년부터 한국데이터산업진흥원의 공식 파트너로 활동하는 전문기업입니다.",
      details:
        "2021~2024년 수요기업 선정률 94%를 기록하며 총 32개사의 데이터 수집/가공 업무를 무사히 마쳤습니다. 카이스트 연구원으로 재직중인 기술이사를 필두로 명문대 출신 개발팀 인력을 보유하고 있습니다.",
    },
  ];

  const dataProcessSteps = [
    {
      step: "데이터 수집/가공 프로젝트 업로드",
      desc: "수요기업과 협의한 내용의 데이터 수집/가공 프로젝트를 LEAN-AI 플랫폼에 업로드",
      icon: <Upload className="w-5 h-5" />,
      color: "from-sky-400 to-sky-300",
    },
    {
      step: "작업 희망자 신청 및 테스트",
      desc: "LEAN-AI 소속 작업자들은 내용을 확인하고 작업 희망자는 작업 신청, 테스트과제 작성 및 제출",
      icon: <UserCheck className="w-5 h-5" />,
      color: "from-cyan-400 to-cyan-300",
    },
    {
      step: "테스트 심사",
      desc: "제출된 테스트 과제를 바탕으로 수집/가공업무를 수행할 역량이 있는 지 심사 진행, 역량 미달 작업자는 승인 거부",
      icon: <ClipboardCheck className="w-5 h-5" />,
      color: "from-sky-400 to-sky-300",
    },
    {
      step: "승인된 인원 작업 진행",
      desc: "테스트를 통과한 작업자들은 데이터 수집/가공 업무 진행",
      icon: <CheckSquare className="w-5 h-5" />,
      color: "from-cyan-400 to-cyan-300",
    },
    {
      step: "작업 완료 후 검수 및 반려",
      desc: "완성된 작업물을 제출하면 린에이아이 연구원들이 데이터 검수 진행, 미흡한 내역에 대해서는 반려 및 재작업 요청",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "from-sky-400 to-cyan-300",
    },
  ];

  const benefits = [
    "데이터 수집 및 가공에 필요한 시간적, 비용적 부담 최소화",
    "최고품질의 데이터를 최단기간에 제공받을 수 있음",
    "사업기획부터 사업완료까지 전 과정 일원화된 지원",
    "크라우드소싱 통한 작업으로 효율적인 데이터 처리 가능",
    "기업내 양질의 데이터 전달로 AI 바우처 연계 컨설팅 지원",
  ];

  const tabs = [
    { id: "features", label: "주요 특징", icon: <Star className="w-5 h-5" /> },
    {
      id: "process",
      label: "수집/가공",
      icon: <FileCog className="w-5 h-5" />,
    },
    { id: "benefits", label: "도입 혜택", icon: <Gift className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full rounded-3xl border border-sky-300 bg-white shadow-lg px-4 py-8 sm:p-10 overflow-y-auto font-ibm">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-10"
          >
            <div className="inline-flex items-center mb-4 px-3 py-1.5 bg-sky-100 border border-sky-200 rounded-full text-sm sm:text-base">
              <Rocket className="w-4 h-4 text-sky-500 mr-2" strokeWidth={1.5} />
              <span className="text-sky-700 font-medium">
                린에이아이 솔루션
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 leading-snug">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500 font-gmarket">
                LEAN-AI
              </span>
            </h2>
            <p className="text-gray-700 max-w-3xl text-base md:text-lg leading-relaxed">
              린에이아이는 AI 학습용 데이터 수집/가공 전문 솔루션으로,{" "}
              <br className="hidden md:block" />
              최고품질의 데이터를 최단기간에 제공하여 비즈니스 성장에
              기여합니다.
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
                    ? "bg-gradient-to-r from-sky-400 to-cyan-400 text-white"
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
                    ? "bg-gradient-to-r from-sky-400 to-cyan-400 text-white"
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
                    <Star className="ml-2 w-6 h-6 md:w-8 md:h-8 text-sky-500" />
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {features.map((feature) => (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() =>
                          setActiveFeature(
                            feature.id === activeFeature ? null : feature.id
                          )
                        }
                        className={`group p-3 md:p-5 rounded-2xl border cursor-pointer transition-colors duration-300 ${
                          activeFeature === feature.id
                            ? "bg-gradient-to-br from-sky-100 to-cyan-100 border-sky-300"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div
                              className={`p-2 bg-white text-sky-500 rounded-lg mr-1.5 md:mr-3 transition-colors duration-300`}
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
                                ? "bg-sky-400"
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
                    className="p-4 md:p-6 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50"
                  >
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-5 h-5 text-sky-500 mr-2" />
                      <h3 className="font-semibold text-xl md:text-2xl text-gray-800">
                        데이터 수집/가공 서비스
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-5 text-sm md:text-base">
                      린에이아이는 웹사이트 등에 혼재되어 있는 다양한 분야의
                      데이터를 수요기업에서 요청하는 형식으로 정리한 데이터셋을
                      제공하며, <br />
                      이외에도 다양한 형태의 모든 데이터 수집/가공 작업을
                      제공합니다.
                    </p>

                    <AnimatePresence initial={false}>
                      {(isMobile || showAllTags) && (
                        <motion.div
                          key="tags"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
                            {tagsToDisplay.map((tech, index) => (
                              <div
                                key={index}
                                className="px-3 py-1 bg-sky-100 text-sky-600 text-xs md:text-sm rounded-full border border-sky-200 text-center"
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
                        className="text-sm text-sky-600 hover:underline flex items-center mt-2"
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
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 inline-flex items-center">
                    데이터 수집/가공
                    <FileCog className="ml-2 w-6 h-6 md:w-8 md:h-8 text-sky-500" />
                  </h3>

                  {/* 단계 설명 프로세스 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 md:p-6 rounded-2xl border border-gray-200 bg-gray-50 mb-4 md:mb-8"
                  >
                    <div className="flex flex-col space-y-4 md:space-y-8">
                      {dataProcessSteps.map((step, index) => (
                        <div key={index} className="relative">
                          <div className="flex flex-col md:flex-row space-y-2 items-start">
                            <div
                              className={`p-2 md:p-3 rounded-full bg-gradient-to-r ${step.color} text-white flex-shrink-0 z-10`}
                            >
                              {step.icon}
                            </div>

                            <div className="ml-1 md:ml-4">
                              <h4 className="text-gray-800 font-semibold text-lg md:text-xl">
                                {step.step}
                              </h4>
                              <p className="text-gray-600 mt-1 text-base md:text-lg">
                                {step.desc}
                              </p>

                              {/* 설명 박스 */}
                              {index === 0 && (
                                <div className="mt-3 bg-sky-50 border border-sky-200 rounded-lg p-3">
                                  <p className="text-sky-700 text-sm">
                                    데이터 수집의 정확도와 품질을 위해 설문내용,
                                    기준, 가이드라인 등 명확한 작업지침이
                                    제공됩니다.
                                  </p>
                                </div>
                              )}
                              {index === 2 && (
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                                    <h5 className="text-sky-700 font-semibold mb-1">
                                      테스트 심사 기준
                                    </h5>
                                    <p className="text-gray-600 text-sm">
                                      작업 지침에 따른 정확한 데이터 수집/가공
                                      능력, 세부 요구사항 반영 여부, 일관된 형식
                                      준수가 평가됩니다.
                                    </p>
                                  </div>
                                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                                    <h5 className="text-sky-700 font-semibold mb-1">
                                      역량 미달 작업자
                                    </h5>
                                    <p className="text-gray-600 text-sm">
                                      테스트 과제를 통과하지 못한 작업자는 해당
                                      프로젝트에 참여할 수 없으며, 품질 관리를
                                      위해 엄격한 심사 기준이 적용됩니다.
                                    </p>
                                  </div>
                                </div>
                              )}
                              {index === 4 && (
                                <div className="mt-3 bg-sky-50 border border-sky-200 rounded-lg p-3">
                                  <p className="text-sky-700 text-sm">
                                    린에이아이 연구원들은 완성된 작업물을 면밀히
                                    검토하고, 각 데이터 항목에 대한 품질을
                                    평가합니다. 미흡한 부분은 구체적인 피드백과
                                    함께 반려되어 재작업이 이루어집니다.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 데이터바우처 프로세스 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 md:p-6 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50"
                  >
                    <div className="flex items-center mb-4">
                      <Rocket className="w-6 h-6 md:w-8 md:h-8 text-sky-500 mr-2" />
                      <h3 className="font-semibold text-xl md:text-2xl text-gray-800">
                        AI/데이터바우처 시작하기
                      </h3>
                    </div>

                    {/* PC용 */}
                    <DataVoucherProcessPC />
                    {/* 모바일용 */}
                    <DataVoucherProcessMobile />

                    {/* 마무리 문장 */}
                    <div className="mt-6 px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-gray-700 text-sm">
                        린에이아이는 2021년부터 한국데이터산업진흥원의 공식
                        파트너로 활동해온 공급기업입니다.
                        <br />총 32개사의 데이터 수집/가공 업무를 무사히
                        마쳤습니다. 수요기업의 성공적인 사업수행을 위한 모든
                        분야에 대해 지원합니다.
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
                    <Gift className="ml-2 w-6 h-6 md:w-8 md:h-8 text-sky-500" />
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 혜택 리스트 */}
                    <div className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                        >
                          <div className="p-1 bg-sky-100 text-sky-500 rounded-full mr-3 mt-1">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <p className="text-gray-700 text-base">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* 강조 카드 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 md:p-6 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <div className="inline-flex items-center px-3 py-1 bg-white rounded-full mb-4 border border-gray-200 shadow-sm">
                          <Award className="w-4 h-4 text-sky-500 mr-2" />
                          <span className="text-sky-700 text-sm">
                            2021~2024년 데이터바우처 공급 기업 선정
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                          데이터바우처 사업을 위한 최고의 파트너
                        </h3>

                        <p className="text-gray-700 mb-8 text-base leading-relaxed">
                          린에이아이는 2021년부터 한국데이터산업진흥원의 공식
                          파트너로 활동하는 전문기업입니다.
                          <br className="hidden md:block " /> 검증된 노하우와
                          경험을 바탕으로 수요기업의 성공적인 사업 수행을
                          지원합니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <span className="text-gray-600 text-sm">
                            수집/가공 데이터 수
                          </span>
                          <span className="text-cyan-500 font-bold text-lg">
                            2,238,844건
                          </span>
                        </div>

                        <button
                          onClick={() => setIquiryModalOpen(true)}
                          className="w-full p-4 bg-gradient-to-r from-sky-400 to-cyan-400 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-200 transition-all duration-300 flex items-center justify-center text-center"
                        >
                          린에이아이 문의하기
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* 수상/인증 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-4 md:p-6 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-sm"
                  >
                    <div className="flex items-center mb-4">
                      <BadgeCheck className="w-5 h-5 text-sky-500 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-800">
                        수상 및 인증
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 수상 */}
                      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-gray-800 mb-3 font-semibold text-lg">
                          주요 수상 내역
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            2020 4IR Awards AI부문 대상
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            제 3회 서울혁신챌린지 최우수상(1등)
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            2019 산업지능화 스타트업 창업경진대회 우수상(2등)
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            2018 고려대 SW중심대학 창업경진대회 최우수상
                          </li>
                        </ul>
                      </div>

                      {/* 인증 */}
                      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-gray-800 mb-3 font-semibold text-lg">
                          주요 인증 내역
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            중소벤처기업부 비대면바우처 지원사업 공급기업 선정
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            한국데이터산업진흥원 AI 데이터바우처 지원사업
                            공급기업 선정
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            기보벤처펀드 4기 우수 협업기업 선정
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mr-2 mt-0.5" />
                            AI-Tech 기업, 기술 인증 (한국인공지능협회)
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

export default LeanAI;