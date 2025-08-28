"use client";

import { useEffect, useState, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import Navbar from "../components/common/Navbar";
import CustomCursor from "../components/common/CustomCursor";
import HeroSection from "@/components/landing/Hero";
import AboutSection from "@/components/landing/About";
import ServiceSection from "@/components/landing/Service";
import ContactSection from "@/components/landing/Contact";
import Footer from "@/components/common/Footer";
import NewsletterButton from "@/components/common/NewsletterButton";
import ScrollToTopButton from "@/components/common/ScrollTopButton";

export default function LandingPage() {
  const isMobile = useIsMobile(); // 모바일 화면 여부
  const [showFloatingButtons, setShowFloatingButtons] = useState(false); // 플로팅 버튼 노출 여부
  const heroRef = useRef(null); // HeroSection DOM 참조

  // HeroSection이 보이지 않을 때 플로팅 버튼 노출
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingButtons(!entry.isIntersecting); // HeroSection이 뷰포트에서 벗어나면 true
      },
      {
        threshold: 0.1, // 10% 이상 화면에 보여야 intersecting으로 판단
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current); // HeroSection 감시 시작
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current); // 컴포넌트 정리 시 감시 해제
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* 상단 네비게이션 바 */}
      <Navbar isLanding={true} />

      {/* PC 환경일 때만 커스텀 커서 사용 */}
      {!isMobile && <CustomCursor />}

      {/* 주요 콘텐츠 섹션 */}
      <div className="flex flex-col bg-white">
        <div ref={heroRef}>
          <HeroSection /> {/* HeroSection을 감시 대상으로 설정 */}
        </div>
        <AboutSection />
        <ServiceSection />
        <ContactSection />
      </div>

      {/* 하단 푸터 */}
      <Footer />

      {/* HeroSection에서 벗어났을 때만 플로팅 버튼 노출 */}
      {showFloatingButtons && (
        <>
          <NewsletterButton /> {/* 뉴스레터 버튼 */}
          <ScrollToTopButton /> {/* 최상단 이동 버튼 */}
        </>
      )}
    </div>
  );
}
