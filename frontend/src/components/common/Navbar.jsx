"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Home,
  Building2,
  LayoutGrid,
  MessageCircle,
  Megaphone,
  ChevronsRight,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import InquiryModal from "@/components/modal/inquiry/InquiryModal";

export default function Navbar({ activeTab = "leanai" }) {
  const [collapsed, setCollapsed] = useState(false); // 데스크톱 메뉴 접힘 여부
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // 모바일 메뉴 열림 여부
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // 마우스 위치 추적 (호버 효과용)
  const [hoverItem, setHoverItem] = useState(null); // 현재 호버된 메뉴 이름
  const isMobile = useIsMobile(); // 모바일 화면 여부 저장
  const [openSubmenu, setOpenSubmenu] = useState(null); // 열린 서브메뉴 항목
  const navRef = useRef(null); // 네비게이션 DOM 참조
  const pathname = usePathname(); // 현재 경로
  const [isInquiryModalOpen, setInquiryModalOpen] = useState(false); // 문의 모달 오픈 여부

  // 마우스 이동 이벤트 등록
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 모바일 상태가 바뀌면 접힘 상태 설정
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false); // 데스크톱일 땐 펴지게
    }
  }, [isMobile]);

  // path 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // 서브메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openSubmenu && !e.target.closest(".submenu-container")) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSubmenu]);

  // 메뉴 항목 정의
  const navItems = [
    { name: "홈", path: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "회사소개",
      path: "/company",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      name: "서비스",
      path: null,
      icon: <LayoutGrid className="w-5 h-5" />,
      submenu: [
        {
          icon: "Table",
          name: "AI 학습용 데이터셋 구축",
          path: "/solution?tab=leanai",
        },
        {
          icon: "BrainCircuit",
          name: "맞춤형 AI 솔루션 개발",
          path: "/solution?tab=mumul",
        },
      ],
    },
    { name: "뉴스", path: "/news", icon: <Megaphone className="w-5 h-5" /> },
    {
      name: "문의",
      path: null,
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => setInquiryModalOpen(true),
    },
  ];

  // 테마 정의 (leanai / mumul)
  const theme = {
    leanai: {
      primary: "sky-500",
      secondary: "cyan-400",
      primaryHover: "sky-700",
      primaryRgb: "56, 189, 248",
      secondaryRgb: "34, 211, 238",
      active: "bg-gradient-to-r from-sky-500 to-cyan-400",
      activeText: "text-white",
      inactiveText: "text-gray-800 dark:text-gray-200",
      glowEffect: "shadow-sky-400/40",
      lightBg: "bg-sky-200/70",
      lightHoverBg: "bg-sky-200/90",
      lightText: "text-sky-700",
      lightHoverText: "text-sky-900",
      accentBg: "bg-sky-100/80",
      accentHoverBg: "bg-sky-200/90",
      accentText: "text-sky-700",
      accentHoverText: "text-sky-800",
      border: "border-white/50 dark:border-gray-700/50",
      navBg: "bg-gradient-to-r from-sky-50/70 to-cyan-50/70",
      logoGlow: "bg-sky-400",
      logoText: "text-sky-600",
    },
    mumul: {
      primary: "indigo-500",
      secondary: "violet-400",
      primaryHover: "indigo-700",
      primaryRgb: "99, 102, 241",
      secondaryRgb: "167, 139, 250",
      active: "bg-gradient-to-r from-indigo-500 to-violet-400",
      activeText: "text-white",
      inactiveText: "text-gray-800 dark:text-gray-200",
      glowEffect: "shadow-indigo-400/40",
      lightBg: "bg-indigo-200/70",
      lightHoverBg: "bg-indigo-200/90",
      lightText: "text-indigo-700",
      lightHoverText: "text-indigo-900",
      accentBg: "bg-indigo-100/80",
      accentHoverBg: "bg-indigo-200/90",
      accentText: "text-indigo-700",
      accentHoverText: "text-indigo-800",
      border: "border-white/50 dark:border-gray-700/50",
      navBg: "bg-gradient-to-r from-indigo-50/70 to-violet-50/70",
      logoGlow: "bg-indigo-400",
      logoText: "text-indigo-600",
    },
  };

  const currentTheme = theme[activeTab] || theme["leanai"];

  // 현재 path와 일치하는 메뉴 여부
  const isActive = (path) => {
    if (!path) return false; // path가 null/undefined일 경우 항상 false
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };
  const isSubmenuActive = (submenuItems) => {
    if (!submenuItems) return false;
    return submenuItems.some((item) => isActive(item.path));
  };

  // 모바일/서브메뉴 애니메이션 정의
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const submenuVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const submenuItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 },
  };

  const mobileSubmenuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  // 서브메뉴 토글
  const toggleSubmenu = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  return (
    <div className="font-ibm">
      <motion.nav
        ref={navRef}
        className={`fixed ${isMobile ? "top-4 right-4 left-4" : "top-4 right-6"} z-50 `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 내부 컨테이너 (접힘 상태에 따라 너비 변경) */}
        <motion.div
          animate={{
            width: collapsed && !isMobile ? 64 : isMobile ? "auto" : 740,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          className={`relative backdrop-blur-xl bg-sky-200/20 dark:bg-gray-900/70 rounded-full ${currentTheme.border} p-1.5 flex items-center shadow-lg`}
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* 호버 효과 */}
          {hoverItem && !collapsed && !isMobile && (
            <motion.div
              className="absolute bg-white/30 dark:bg-white/20 rounded-full z-0"
              initial={{
                width: 0,
                height: 0,
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              animate={{
                width: 200,
                height: 60,
                x: mousePosition.x - 90,
                y: mousePosition.y - 30,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          <div className="relative z-50 flex items-center justify-between w-full">
            <div className="flex items-center w-full">
              {/* 왼쪽: 로고 및 접기/펼치기 버튼 */}
              {!isMobile && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className={`p-3 rounded-full ${currentTheme.lightText} ${
                    collapsed ? currentTheme.lightBg : "bg-white/50"
                  } hover:${currentTheme.lightHoverText} transition-colors duration-300 mr-2`}
                >
                  {collapsed ? <Menu size={24} /> : <ChevronsRight size={24} />}
                </button>
              )}

              {/* 로고 (펼쳐진 상태에서만 보임) */}
              {(!collapsed || isMobile) && (
                <Link href="/" className="w-full">
                  <motion.div
                    className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-full py-2 px-4 mr-2 shadow-md w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <motion.div
                        className={`absolute -inset-1 rounded-full ${currentTheme.logoGlow} opacity-70 blur-sm -z-10`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    </div>
                    <span
                      className={`text-xl font-bold text-center font-sans ${currentTheme.logoText} whitespace-nowrap`}
                    >
                      LEAN-AI
                    </span>
                  </motion.div>
                </Link>
              )}
            </div>

            {/* 모바일 메뉴 버튼 / 데스크톱 네비게이션 아이템 */}
            {isMobile ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-full ${currentTheme.accentBg} ${currentTheme.accentText} hover:${currentTheme.accentHoverBg} hover:${currentTheme.accentHoverText} ml-1`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            ) : (
              !collapsed && (
                <div className="hidden md:flex items-center">
                  {navItems.map((item) => {
                    if (item.submenu) {
                      return (
                        <div
                          key={item.name}
                          className="relative submenu-container"
                        >
                          {/* 메인 메뉴 */}
                          <motion.div
                            onClick={() => toggleSubmenu(item.name)}
                            onHoverStart={() => setHoverItem(item.name)}
                            onHoverEnd={() => setHoverItem(null)}
                            className={`relative px-4 py-2 mx-1 rounded-full font-medium text-lg z-40 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                              isSubmenuActive(item.submenu) ||
                              openSubmenu === item.name
                                ? currentTheme.activeText
                                : currentTheme.inactiveText
                            }`}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                          >
                            <span className="relative z-40 flex items-center gap-1.5">
                              {item.icon}
                              {item.name}
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-300 ${
                                  openSubmenu === item.name ? "rotate-180" : ""
                                }`}
                              />
                            </span>
                            {(isSubmenuActive(item.submenu) ||
                              openSubmenu === item.name) && (
                              <motion.div
                                className={`absolute inset-0 rounded-full ${currentTheme.active}`}
                                layoutId="activeNavBackground"
                                transition={{
                                  type: "spring",
                                  bounce: 0.2,
                                  duration: 0.6,
                                }}
                              />
                            )}
                          </motion.div>

                          {/* 서브 메뉴 항목 */}
                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.div
                                className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={submenuVariants}
                                style={{
                                  boxShadow: `0 4px 20px -2px rgba(${currentTheme.primaryRgb}, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)`,
                                }}
                              >
                                <div className="py-2 px-1">
                                  {item.submenu.map((subItem) => (
                                    <motion.div
                                      key={subItem.name}
                                      variants={submenuItemVariants}
                                    >
                                      <Link
                                        href={subItem.path}
                                        className={`flex items-center px-4 py-2.5 mx-1 my-1 text-gray-700 hover:bg-sky-400/70 hover:text-white dark:text-gray-200 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm font-medium transition-colors ${
                                          isActive(subItem.path)
                                            ? `bg-gradient-to-r from-${currentTheme.primary} to-${currentTheme.secondary} text-white`
                                            : `hover:bg-${currentTheme.accentBg}`
                                        }`}
                                      >
                                        <div className="flex flex-row space-x-3 items-center">
                                          <ChevronRight className="w-4 h-4" />
                                          <span className="flex-1">
                                            {subItem.name}
                                          </span>
                                        </div>
                                        {isActive(subItem.path) && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className={`bg-white/30 dark:bg-white/20 rounded-full p-1 ml-2`}
                                          >
                                            <span className="sr-only">
                                              Current
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                          </motion.div>
                                        )}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    {
                      /* 일반 메뉴 항목 */
                    }
                    const content = (
                      <motion.div
                        key={item.name}
                        onHoverStart={() => setHoverItem(item.name)}
                        onHoverEnd={() => setHoverItem(null)}
                        className={`relative px-4 py-2 mx-1 rounded-full font-medium text-lg z-40 cursor-pointer ${
                          isActive(item.path || "")
                            ? currentTheme.activeText
                            : currentTheme.inactiveText
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        onClick={item.onClick}
                      >
                        <span className="relative z-40 flex items-center gap-1.5 whitespace-nowrap">
                          {item.icon}
                          {item.name}
                        </span>
                        {isActive(item.path || "") && (
                          <motion.div
                            className={`absolute inset-0 rounded-full ${currentTheme.active}`}
                            layoutId="activeNavBackground"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </motion.div>
                    );

                    return item.path ? (
                      <Link key={item.name} href={item.path}>
                        {content}
                      </Link>
                    ) : (
                      <div key={item.name}>{content}</div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </motion.div>
      </motion.nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            className="fixed inset-x-4 top-20 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4 border border-white/50 dark:border-gray-800/50 shadow-xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            style={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* 서브 메뉴 */}
            <div className="space-y-1">
              {navItems.map((item) => {
                if (item.submenu) {
                  return (
                    <div key={item.name} className="mb-1">
                      <motion.button
                        variants={mobileMenuItemVariants}
                        onClick={() => toggleSubmenu(item.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                          isSubmenuActive(item.submenu)
                            ? currentTheme.active +
                              " " +
                              currentTheme.activeText
                            : `hover:${currentTheme.accentBg} ${currentTheme.inactiveText}`
                        }`}
                        aria-expanded={openSubmenu === item.name}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </motion.button>
                      {/* 서브 메뉴 항목 */}
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={mobileSubmenuVariants}
                            className="overflow-hidden"
                          >
                            <div className="pt-1 pl-6 pr-2 pb-1 space-y-1">
                              {item.submenu.map((subItem) => (
                                <motion.div
                                  key={subItem.name}
                                  variants={submenuItemVariants}
                                  className="rounded-xl overflow-hidden"
                                >
                                  <Link
                                    href={subItem.path}
                                    className={`block px-4 py-2.5 text-sm rounded-xl ${
                                      isActive(subItem.path)
                                        ? `bg-gradient-to-r from-${currentTheme.primary}/80 to-${currentTheme.secondary}/80 text-white`
                                        : `text-gray-700 dark:text-gray-300 hover:bg-${currentTheme.accentBg}/50`
                                    }`}
                                  >
                                    <div className="flex flex-row space-x-2 items-center">
                                      <ChevronRight className="w-4 h-4" />
                                      <span>{subItem.name}</span>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                {
                  /* 일반 메뉴 항목 */
                }
                const itemContent = (
                  <motion.div key={item.name} variants={mobileMenuItemVariants}>
                    <div
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setMobileMenuOpen(false); // 클릭 시 메뉴 닫기
                      }}
                      className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                        isActive(item.path || "")
                          ? currentTheme.active + " " + currentTheme.activeText
                          : `hover:${currentTheme.accentBg} ${currentTheme.inactiveText}`
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </motion.div>
                );

                return item.path ? (
                  <Link key={item.name} href={item.path}>
                    {itemContent}
                  </Link>
                ) : (
                  <div key={item.name}>{itemContent}</div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 문의 모달 */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        onSubmit={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
