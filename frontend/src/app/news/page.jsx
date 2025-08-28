"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Navbar from "@/components/common/Navbar";
import CustomCursor from "@/components/common/CustomCursor";
import ScrollToTopButton from "@/components/common/ScrollTopButton";
import NewsHero from "@/components/news/NewsHero";
import News from "@/components/news/News";
import NewsCTA from "@/components/news/NewsCTA";
import Footer from "@/components/common/Footer";
import NewsletterButton from "@/components/common/NewsletterButton";

export default function CompanyNewsPage() {
  const isMobile = useIsMobile(); // 모바일 화면 여부 저장

  return (
    <div className="min-h-screen overflow-hidden">
      {/* 상단 네비게이션 - 일반 페이지용 (isLanding = false) */}
      <Navbar isLanding={false} />
      {/* PC 화면일 때만 커스텀 커서 활성화 */}
      {!isMobile && <CustomCursor />}
      {/* 뉴스 관련 콘텐츠 섹션 */}
      <div className="flex flex-col bg-sky-50">
        <NewsHero /> {/* 뉴스 상단 히어로 이미지/소개 */}
        <News /> {/* 뉴스 기사 목록 */}
        <NewsCTA /> {/* CTA: 뉴스레터 구독 유도 또는 이벤트 안내 등 */}
      </div>
      {/* 푸터 */}
      <Footer className="" />
      {/* 오른쪽 하단 플로팅 버튼들 */}
      <NewsletterButton /> {/* 뉴스레터 등록 버튼 */}
      <ScrollToTopButton /> {/* 페이지 상단 이동 버튼 */}
    </div>
  );
}
