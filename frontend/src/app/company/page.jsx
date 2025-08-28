"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Navbar from "@/components/common/Navbar";
import CustomCursor from "@/components/common/CustomCursor";
import TimelineSection from "@/components/company/Timeline";
import IntroductionSection from "@/components/company/CompanyIntroduction";
import PartnerSection from "@/components/company/Partner";
import LocationSection from "@/components/company/Location";
import Footer from "@/components/common/Footer";
import NewsletterButton from "@/components/common/NewsletterButton";
import ScrollToTopButton from "@/components/common/ScrollTopButton";

export default function CompanyPage() {
  const isMobile = useIsMobile();  // 모바일 여부 판단용 상태

  return (
    <div className="min-h-screen relative w-full bg-sky-100 overflow-hidden">
      {/* 배경 효과 레이어 (mix-blend + gradient + blur) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 노이즈 텍스처 오버레이 */}
        <div className="absolute inset-0 noise-bg"></div>

        {/* 다양한 위치에 배치된 그라데이션 구체 - 시각적 배경 효과 */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-gradient-to-br from-sky-300 via-sky-500 to-sky-600 rounded-full opacity-30 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[30%] left-[60%] w-[350px] h-[350px] bg-gradient-to-br from-cyan-200 via-blue-300 to-indigo-400 rounded-full opacity-25 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[65%] right-[10%] w-[300px] h-[300px] bg-gradient-to-tr from-sky-400 via-sky-600 to-blue-700 rounded-full opacity-20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute top-[80%] right-[70%] w-[250px] h-[250px] bg-gradient-to-bl from-blue-300 via-sky-400 to-sky-600 rounded-full opacity-25 blur-[80px] mix-blend-multiply"></div>
        <div className="absolute top-[45%] left-[-100px] w-[280px] h-[280px] bg-gradient-to-br from-cyan-300 via-sky-500 to-indigo-400 rounded-full opacity-20 blur-[110px] mix-blend-multiply"></div>

        {/* 색감 보완용 rose, amber, violet 계열 */}
        <div className="absolute top-[15%] left-[20%] w-[240px] h-[240px] bg-gradient-to-br from-rose-200 via-rose-300 to-rose-400 rounded-full opacity-15 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[30%] right-[5%] w-[220px] h-[220px] bg-gradient-to-tr from-amber-200 via-orange-300 to-orange-400 rounded-full opacity-10 blur-[90px] mix-blend-multiply"></div>
        <div className="absolute top-[40%] left-[55%] w-[280px] h-[280px] bg-gradient-to-br from-violet-300 via-purple-400 to-indigo-400 rounded-full opacity-12 blur-[100px] mix-blend-multiply"></div>
      </div>

      {/* 고정 네비게이션 바 (isLanding=false: 일반 페이지용 스타일) */}
      <Navbar isLanding={false} />

      {/* PC에서만 보이는 커스텀 커서 */}
      {!isMobile && <CustomCursor />}

      {/* 실제 콘텐츠 섹션 */}
      <div className="flex flex-col space-y-5 md:space-y-10 relative z-10 p-5">
        <IntroductionSection /> {/* 회사 소개 텍스트/비전/가치 등 */}
        <TimelineSection /> {/* 회사 연혁 및 주요 이정표 */}
        <PartnerSection /> {/* 파트너사, 협업 기업, 고객사 등 */}
        <LocationSection /> {/* 주소, 지도, 오시는 길 등 */}
      </div>

      {/* 푸터 */}
      <Footer className="" />

      {/* 오른쪽 하단 floating 버튼들 */}
      <NewsletterButton /> {/* 뉴스레터 구독 버튼 */}
      <ScrollToTopButton /> {/* 최상단 이동 버튼 */}
    </div>
  );
}
