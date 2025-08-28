"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Home,
  Send,
  Users,
  Clock,
  LayoutTemplate,
  Inbox,
  IdCard,
  ChevronRight,
  Mail,
} from "lucide-react";
import SendTab from "@/components/adminTab/SendTab";
import SubscribersTab from "@/components/adminTab/SubscribersTab";
import HistoryTab from "@/components/adminTab/HistoryTab";
import TemplateTab from "@/components/adminTab/TemplateTab";
import InquiryTab from "@/components/adminTab/InquiryTab";
import RecruitTab from "@/components/adminTab/RecruitTab";
import Spinner from "@/components/ui/Spinner";
import AdminFooter from "@/components/common/AdminFooter";

// 환경변수에서 프론트엔드 도메인 가져오기
const FRONT_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;

export default function NewsletterPage() {
  const [token, setToken] = useState(null); // 인증 토큰
  const [loadingToken, setLoadingToken] = useState(true); // 토큰 로딩 중 여부
  const [activeTab, setActiveTab] = useState("send"); // 현재 활성화된 탭
  const [templateData, setTemplateData] = useState(null); // 템플릿 선택 시 전달될 데이터
  const router = useRouter(); // Next.js 라우터

  // 템플릿을 선택하면 SendTab으로 넘기기 위한 콜백 함수
  const handleUseTemplate = (data) => {
    setTemplateData(data);
    setActiveTab("send"); // 자동으로 발송 탭으로 전환
  };

  // 탭 목록
  const tabs = [
    { key: "send", label: "뉴스레터 발송", icon: <Send className="h-4 w-4" /> },
    {
      key: "subscribers",
      label: "구독자 목록",
      icon: <Users className="h-4 w-4" />,
    },
    { key: "history", label: "발송 이력", icon: <Clock className="h-4 w-4" /> },
    {
      key: "template",
      label: "템플릿 관리",
      icon: <LayoutTemplate className="h-4 w-4" />,
    },
    {
      key: "inquiry",
      label: "문의 관리",
      icon: <Inbox className="h-4 w-4" />,
    },
    {
      key: "recruit",
      label: "채용 관리",
      icon: <IdCard className="h-4 w-4" />,
    },
  ];

  // 인증 토큰 검사 (마운트 시 한 번만 실행)
  useEffect(() => {
    const storedToken = sessionStorage.getItem("adminToken");
    if (!storedToken) {
      router.push("/admin/login");
    } else {
      setToken(storedToken); // ✅ token 저장
    }
    setLoadingToken(false);
  }, [router]);

  return (
    <div className="min-h-screen bg-blue-50/30 font-nanumsquareround">
      {/* 상단 네비게이션 바 */}
      <nav className="relative z-10 border-b border-sky-100 py-4 px-6 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold flex items-center">
            <div className="bg-sky-400 text-white p-2 rounded-lg mr-3">
              <Mail className="h-5 w-5" />
            </div>
            <span className="bg-black bg-clip-text text-transparent">
              뉴스레터 관리
            </span>
          </h1>

          {/* 오른쪽 상단 버튼들 */}
          <div className="flex space-x-4">
            {/* 홈 버튼 */}
            <button
              onClick={() => {
                sessionStorage.removeItem("adminToken");
                router.push(`${FRONT_DOMAIN}`);
              }}
              className="text-sm text-sky-500 hover:text-sky-600 flex hover:font-bold items-center transition-colors px-4 py-2 rounded-full bg-sky-100 "
            >
              <Home className="h-4 w-4 mr-1.5" />
              린에이아이로 이동
            </button>
            {/* 로그아웃 버튼 */}
            <button
              onClick={() => {
                sessionStorage.removeItem("adminToken");
                router.push("/admin/login");
              }}
              className="text-sm text-gray-600 hover:text-gray-700 hover:font-bold flex items-center transition-colors px-4 py-2 rounded-full bg-gray-100 "
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      {/* 전체 콘텐츠  */}
      <div
        data-testid="newsletter-page"
        className="max-w-6xl mx-auto mt-8 px-4 pb-16 relative z-10"
      >
        <div className="md:flex md:gap-8">
          {/* 좌측 사이드바 메뉴 */}
          <div className="md:w-72 mb-6 md:mb-0">
            <div className="sticky top-8">
              <div className="mb-6 bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">
                <div className="bg-white px-5 py-4">
                  <h2 className="text-gray-700 font-extrabold text-lg">
                    관리 메뉴
                  </h2>
                  <div className="mt-1 h-1 w-16 bg-sky-500/50 rounded-full"></div>
                </div>

                {/* 탭 리스트 */}
                <div className="p-2 bg-blue-300/30 ">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full text-left mb-1 flex items-center px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.key
                          ? "bg-white text-sky-500 font-bold shadow-md border border-sky-100"
                          : "text-gray-400 hover:text-gray-700 hover:bg-white/30 hover:font-bold"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                          activeTab === tab.key
                            ? "bg-sky-400 text-white"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        {tab.icon}
                      </div>
                      {tab.label}
                      {activeTab === tab.key && (
                        <ChevronRight className="h-4 w-4 ml-auto text-sky-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 우측 메인 콘텐츠 */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-sky-100 overflow-hidden">
              {/* 섹션 헤더 */}
              <div className="px-8 py-6 bg-white border-b border-sky-100">
                <div className="flex items-center text-gray-800">
                  <div className="mr-4 p-2 bg-sky-400 rounded-xl text-white">
                    {tabs.find((t) => t.key === activeTab)?.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {tabs.find((t) => t.key === activeTab)?.label}
                    </h2>
                    {/* 탭에 따른 설명 문구 */}
                    <p className="text-sm text-gray-500 mt-1">
                      {activeTab === "send" &&
                        "뉴스레터를 작성하고 구독자에게 전송하세요"}
                      {activeTab === "subscribers" &&
                        "구독자 목록을 관리하고 분석하세요"}
                      {activeTab === "history" &&
                        "이전에 발송한 뉴스레터 기록을 확인하세요"}
                      {activeTab === "template" &&
                        "뉴스레터 템플릿을 관리하세요"}
                      {activeTab === "inquiry" && "문의 사항을 확인하세요"}
                      {activeTab === "recruit" &&
                        "진행 중인 채용 정보를 확인하세요"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 탭별 컴포넌트 렌더링 */}
              {!loadingToken && token ? (
                <>
                  {activeTab === "send" && (
                    <SendTab token={token} templateData={templateData} />
                  )}
                  {activeTab === "subscribers" && (
                    <SubscribersTab token={token} />
                  )}
                  {activeTab === "history" && <HistoryTab token={token} />}
                  {activeTab === "template" && (
                    <TemplateTab
                      token={token}
                      onUseTemplate={handleUseTemplate}
                    />
                  )}
                  {activeTab === "inquiry" && <InquiryTab token={token} />}
                  {activeTab === "recruit" && <RecruitTab token={token} />}
                </>
              ) : (
                <Spinner /> // 로딩 중일 때는 스피너 표시
              )}
            </div>
          </div>
        </div>

        {/* 하단 공통 푸터 */}
        <AdminFooter />
      </div>

      {/* 글로벌 애니메이션 정의  */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
