"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// 화면에 보여줄 히어로 텍스트 목록
const HeroText = [
  { id: 1, text: "Revolutionizing AI for lean business processes" },
  { id: 2, text: "Optimize your workflow with intelligent automation" },
  { id: 3, text: "Data-driven insights for smarter decision making" },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지고 있는 텍스트 인덱스
  const isThrottled = useRef(false); // 스크롤 이벤트 중복 실행 방지용 플래그
  const [allowScroll, setAllowScroll] = useState(false); // 모든 Hero 텍스트가 다 보여졌을 때 스크롤 가능하게 제어
  const canvasRef = useRef(null); // 배경 캔버스 DOM 참조
  const animationRef = useRef(0); // requestAnimationFrame ID 저장

  // 컴포넌트 최초 마운트 시 페이지 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 마우스 휠 이벤트 처리 (텍스트 순차 전환)
  useEffect(() => {
    const handleWheel = (e) => {
      if (allowScroll) return; // 텍스트 다 본 뒤엔 스크롤 막지 않음

      e.preventDefault();

      if (isThrottled.current) return;
      isThrottled.current = true;

      // 다음 텍스트로 전환
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // 마지막 인덱스 도달 시 스크롤 허용
        if (next >= HeroText.length) {
          setAllowScroll(true);
          return prev; // 그대로 유지
        }
        return next;
      });

      setTimeout(() => {
        isThrottled.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [allowScroll]);

    // 배경 캔버스 애니메이션 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    
    // 캔버스 사이즈 창 크기에 맞게 조정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

     // 파티클 클래스 정의
     class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.7;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.color = "rgba(209, 237, 255, 0.9)";
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 파티클 개수는 해상도 비례
    const particleCount = Math.min(
      100,
      Math.floor((window.innerWidth * window.innerHeight) / 10000)
    );
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 그리드 배경선
      ctx.strokeStyle = "rgba(0, 0, 100, 0.1)";
      ctx.lineWidth = 0.5;

      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // 파티클 업데이트 & 그리기
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 클린업
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div>
      <section
        id="home"
        className="gradient-background flex flex-col items-center justify-center h-screen bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 text-white overflow-hidden"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* 캔버스 배경 */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: -1 }}
        />

        {/* 텍스트 콘텐츠 */}
        <div className="text-center px-4 z-10 font-gmarket">
          {/* 로고 타이틀 */}
          <motion.h1
            className="text-5xl md:text-8xl font-bold mb-8 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            LEAN-AI
          </motion.h1>

          {/* 전환되는 메인 문구 */}
          <motion.p
            key={HeroText[currentIndex]?.id}
            className="text-center text-xl md:text-3xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {HeroText[currentIndex]?.text}
          </motion.p>

          {/* 스크롤 안내 메시지 */}
          <AnimatePresence>
            {!allowScroll && (
              <motion.div
                key="scroll-indicator"
                className="mt-12 text-sm opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
              >
                Scroll to continue ({currentIndex + 1}/{HeroText.length})
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}