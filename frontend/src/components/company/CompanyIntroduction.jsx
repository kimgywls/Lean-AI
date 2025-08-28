import { useEffect, useRef, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Star,
  Compass,
  ArrowRight,
  Heart,
  Handshake,
  Globe,
  Zap,
} from "lucide-react";

const CompanyIntroduction = () => {
  const isMobile = useIsMobile(); // 모바일 화면 여부 저장
  const [activeSection, setActiveSection] = useState("vision"); // 현재 활성화된 탭 섹션 (기본값: vision)
  const [hoveredTab, setHoveredTab] = useState(null); // 현재 마우스가 올라간 탭
  const containerRef = useRef(null); // 배경 애니메이션을 적용할 컨테이너 요소의 ref
  const backgroundControls = useAnimation(); // 배경 애니메이션 제어용 컨트롤러

  // 배경 애니메이션을 설정
  useEffect(() => {
    // 배경 애니메이션 시작 - 천천히 확대/축소를 반복
    backgroundControls.start({
      scale: [1, 1.1, 1], // 크기 변화 패턴 (1 -> 1.1 -> 1)
      transition: {
        duration: 20, // 애니메이션 지속 시간 (초)
        repeat: Number.POSITIVE_INFINITY, // 무한 반복
        ease: "easeInOut", // 애니메이션 가속도 함수
      },
    });
  }, [backgroundControls]);

  // 공통 애니메이션 variants
  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const valueVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // 핵심 가치 데이터
  const coreValues = [
    {
      title: "혁신",
      description: "끊임없는 기술 혁신으로 새로운 가치를 창출합니다.",
      icon: <Zap className="w-6 h-6" />,
      bgColor: "from-yellow-300 to-amber-400",
      highlightColor: "bg-yellow-400",
      borderColor: "border-gray-200",
      feature1: "기술 트렌드 주도",
      feature2: "지속적인 개선",
      feature3: "창의적 사고",
    },
    {
      title: "신뢰",
      description: "고객과의 신뢰를 바탕으로 투명하고 정직하게 일합니다.",
      icon: <Handshake className="w-6 h-6" />,
      bgColor: "from-lime-300 to-green-400",
      highlightColor: "bg-lime-400",
      borderColor: "border-gray-200",
      feature1: "투명한 커뮤니케이션",
      feature2: "윤리적 경영",
      feature3: "장기적 관계",
    },
    {
      title: "글로벌 지향",
      description: "세계 시장을 향해 나아가는 글로벌 역량을 갖춥니다.",
      icon: <Globe className="w-6 h-6" />,
      bgColor: "from-blue-300 to-indigo-400",
      highlightColor: "bg-blue-400",
      borderColor: "border-gray-200",
      feature1: "글로벌 네트워크",
      feature2: "다양성 존중",
      feature3: "국제적 기준 준수",
    },
  ];

  // 탭 정보
  const tabs = [
    {
      key: "vision",
      label: "비전 (Vision)",
      icon: <Star className="w-4 h-4" />,
      color: "from-sky-400 to-sky-500",
    },
    {
      key: "mission",
      label: "미션 (Mission)",
      icon: <Compass className="w-4 h-4" />,
      color: "from-sky-400 to-sky-500",
    },
    {
      key: "core",
      label: "핵심 가치 (Core Values)",
      icon: <Heart className="w-4 h-4" />,
      color: "from-sky-400 to-sky-500",
    },
  ];

  // 모바일 화면 전용 렌더링
  const renderMobileView = () => {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0 font-ibm"
        ref={containerRef}
      >
        {/* 본문 */}
        <div className="relative z-10 mx-auto">
          {/* 제목 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-400  to-sky-600 bg-clip-text text-transparent font-gmarket mt-5">
              LEAN-AI
            </h2>
            <p className="text-gray-500 mt-2 font-medium tracking-wide">
              LEAN-AI는 AI 기술로 <br className="block md:hidden" /> 더 나은
              세상을 만들어갑니다.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40px" }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="h-[2px] bg-gradient-to-r from-sky-300 to-sky-500 mx-auto mt-4 rounded-full"
            />
          </motion.div>

          {/* 탭 */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm p-2 mb-5 border border-sky-50">
            <div className="flex flex-col space-y-1.5">
              {tabs.map(({ key, label, icon, color }) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`relative flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                    activeSection === key
                      ? "text-white shadow-sm"
                      : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeSection === key && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    <span
                      className={`mr-3 ${
                        activeSection === key ? "text-white" : "text-sky-500"
                      }`}
                    >
                      {icon}
                    </span>
                    <span className="font-medium">{label}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="relative py-6 md:py-12 px-0 md:px-4 px-0 md:px-4">
            <AnimatePresence mode="wait">
              {activeSection === "vision" && (
                <motion.div
                  key="vision"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-sky-50"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shadow-md">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <div className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-sky-600 mb-4">
                      비전 (Vision)
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      우리는{" "}
                      <span className="font-medium text-sky-600">
                        AI와 사람의 협업
                      </span>
                      을 통해 더 스마트한 세상을 만들어갑니다.
                    </p>
                    <div className="absolute bottom-3 right-3 opacity-5 text-8xl font-bold text-sky-500">
                      V
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "mission" && (
                <motion.div
                  key="mission"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-sky-50"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-md">
                        <Compass className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <div className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-sky-600 mb-4">
                      미션 (Mission)
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      고객의 문제를{" "}
                      <span className="font-medium text-sky-600">AI 기술</span>
                      로 해결하여, 일상의 효율을 극대화하고 업무 생산성을
                      향상시키는 솔루션을 제공합니다.
                    </p>
                    <div className="absolute bottom-3 right-3 opacity-5 text-8xl font-bold text-sky-500">
                      M
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "core" && (
                <motion.div
                  key="core"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-sky-50"
                >
                  <h4 className="text-center text-lg font-semibold text-sky-600 mb-5">
                    핵심 가치
                  </h4>
                  <div className="space-y-4">
                    {coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.4,
                          },
                        }}
                        whileHover={{ y: -2 }}
                        className={`bg-white rounded-xl p-4 shadow-sm border ${value.borderColor} transition-all duration-300`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-10 h-10 rounded-lg ${value.highlightColor} flex items-center justify-center text-white shadow-sm flex-shrink-0`}
                          >
                            {value.icon}
                          </div>
                          <div className="ml-4">
                            <h5 className="font-semibold text-gray-800 mb-1.5">
                              {value.title}
                            </h5>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  // 데스크탑 화면용 렌더링
  const renderDesktopView = () => (
    <section
      className="relative min-h-screen overflow-hidden mt-20 p-10 font-ibm"
      ref={containerRef}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* 헤더 */}
        <div className="mb-20 text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent font-gmarket"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            LEAN-AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 max-w-xl mx-auto font-medium text-lg md:text-xl tracking-wide"
          >
            혁신과 미래를 향한 우리의 약속
          </motion.p>
        </div>

        {/* 탭 영역 */}
        <div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative overflow-hidden bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white"
          >
            {/* 상단 장식 */}
            <div className="absolute top-0 inset-x-0 h-2 bg-blue-300" />

            {/* 탭 버튼 */}
            <div className="flex p-2 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 relative z-20">
              {tabs.map(({ key, label, icon }) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  onMouseEnter={() => setHoveredTab(key)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`flex-1 py-4 px-6 text-center relative transition-all duration-300 flex items-center justify-center ${
                    activeSection === key
                      ? "text-white font-medium"
                      : "text-gray-500 hover:text-sky-500"
                  }`}
                >
                  {activeSection === key && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-sky-400 rounded-xl"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {hoveredTab === key && activeSection !== key && (
                    <motion.div
                      layoutId="hoverTabBg"
                      className="absolute inset-0 bg-sky-50/80 rounded-xl"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="mr-2 relative z-10">{icon}</span>
                  <span className="relative z-10">{label}</span>
                </motion.button>
              ))}
            </div>

            {/* 탭 콘텐츠 */}
            <div className="relative overflow-hidden min-h-[380px] md:min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeSection === "vision" && (
                  <motion.div
                    key="vision"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 p-10 md:p-16 flex flex-col md:flex-row items-center"
                  >
                    <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-16">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.05 }}
                        transition={{ duration: 1 }}
                        className="relative w-32 h-32 md:w-40 md:h-40"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 opacity-20 blur-lg" />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 opacity-40 blur-md" />
                        <div className="relative w-full h-full rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <Star className="w-14 h-14 md:w-16 md:h-16  text-white drop-shadow-md" />
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "40px" }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="h-1 bg-sky-400 rounded-full mr-3"
                        />
                        <span className="text-sky-500 text-sm font-medium tracking-wider">
                          OUR VISION
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        비전 (Vision)
                      </h3>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-sky-100 shadow-lg"
                      >
                        <p className="text-gray-700 leading-relaxed text-xl md:text-2xl">
                          우리는{" "}
                          <span className="font-medium text-sky-600">
                            AI와 사람의 협업
                          </span>
                          을 통해 더 스마트한 세상을 만들어갑니다.
                        </p>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FeatureItem
                            icon={<Handshake />}
                            label="지속 가능한 성장"
                          />
                          <FeatureItem icon={<Globe />} label="글로벌 영향력" />
                          <FeatureItem icon={<Zap />} label="혁신적인 솔루션" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeSection === "mission" && (
                  <motion.div
                    key="mission"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 p-10 md:p-16 flex flex-col md:flex-row items-center"
                  >
                    <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-16">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.05 }}
                        transition={{ duration: 1 }}
                        className="relative w-32 h-32 md:w-40 md:h-40"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-20 blur-lg" />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-40 blur-md" />
                        <div className="relative w-full h-full rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <Compass className="w-14 h-14 md:w-16 md:h-16 text-white drop-shadow-md" />
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "40px" }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="h-1 bg-blue-400 rounded-full mr-3"
                        />
                        <span className="text-blue-500 text-sm font-medium tracking-wider">
                          OUR MISSION
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        미션 (Mission)
                      </h3>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-100 shadow-lg"
                      >
                        <p className="text-gray-700 leading-relaxed text-xl md:text-2xl">
                          고객의 문제를{" "}
                          <span className="font-medium text-blue-600">
                            AI 기술
                          </span>
                          로 해결하여, 일상의 효율을 극대화하고 업무 생산성을
                          향상시키는 솔루션을 제공합니다.
                        </p>

                        <div className="mt-8 flex flex-col space-y-4">
                          <FeatureItem
                            icon={<ArrowRight />}
                            label="기업의 디지털 전환 가속화"
                          />
                          <FeatureItem
                            icon={<ArrowRight />}
                            label="AI 기반 맞춤형 솔루션 제공"
                          />
                          <FeatureItem
                            icon={<ArrowRight />}
                            label="일상과 업무의 효율성 향상"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeSection === "core" && (
                  <motion.div
                    key="core"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 p-10"
                  >
                    <div className="text-center mb-8">
                      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-100 to-sky-100 text-sky-500 text-sm font-medium mb-2">
                        CORE VALUES
                      </span>
                      <h3 className="text-2xl font-bold text-gray-800">
                        우리의 핵심 가치
                      </h3>
                    </div>
                    <motion.div
                      variants={staggerChildren}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          variants={valueVariants}
                          whileHover={{ y: -8, transition: { duration: 0.3 } }}
                          className="group"
                        >
                          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full border border-gray-100 transition-all duration-300 group-hover:shadow-xl transform group-hover:-translate-y-1">
                            <div
                              className={`h-2 bg-gradient-to-r ${value.bgColor}`}
                            />
                            <div className="p-6">
                              <div className="flex items-center mb-4">
                                <div className="relative">
                                  <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${value.bgColor} opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300`}
                                  />
                                  <div
                                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${value.bgColor} flex items-center justify-center text-white`}
                                  >
                                    {value.icon}
                                  </div>
                                </div>
                                <h4 className="ml-4 text-xl font-bold text-gray-800 group-hover:text-sky-600 transition-colors duration-300">
                                  {value.title}
                                </h4>
                              </div>
                              <p className="text-gray-600 text-base mb-6">
                                {value.description}
                              </p>
                              {[
                                value.feature1,
                                value.feature2,
                                value.feature3,
                              ].map((feature, i) => (
                                <div className="flex items-center" key={i}>
                                  <div
                                    className={`w-4 h-4 rounded-full ${value.highlightColor} mr-3 flex-shrink-0`}
                                  />
                                  <span className="text-gray-700 text-sm">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 하단 내비게이션 + 더 알아보기 버튼 */}
            <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-sky-50 to-blue-50 border-t border-sky-100">
              <div className="flex space-x-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveSection(tab.key)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSection === tab.key
                        ? "bg-sky-500 scale-125"
                        : "bg-sky-200 hover:bg-sky-300"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );

  // 하단 공통 사용되는 컴포넌트
  const FeatureItem = ({ icon, label }) => (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-sky-100 text-blue-400 flex items-center justify-center mr-3 shrink-0">
        {icon}
      </div>
      <span className="text-gray-600">{label}</span>
    </div>
  );

  return isMobile ? renderMobileView() : renderDesktopView();
};

export default CompanyIntroduction;
