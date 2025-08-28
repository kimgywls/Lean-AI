// components/news/NewsHero.js
"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function NewsHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
        heroRef.current.style.opacity = 1 - scrollY * 0.002;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden pt-28 pb-20 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 font-ibm">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 opacity-10"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <motion.div
          className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-white opacity-10"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-64 h-64 rounded-full bg-white opacity-10"
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-[40%] right-[25%] w-40 h-40 rounded-full bg-white opacity-5"
          animate={{ scale: [1, 1.4, 1], x: [0, 40, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div ref={heroRef} className="container relative z-10 mx-auto px-4 py-16">
        <motion.div className="max-w-xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <motion.h1
            className="text-4xl md:text-7xl font-semibold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <motion.span
              className="inline-block ml-2 origin-bottom"
              animate={{ rotateZ: [0, -5, 5, -3, 3, 0], y: [0, -5, 3, -2, 0] }}
              transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              <span className="inline-block font-gmarket">News</span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-sky-100 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            LEAN-AI의 최신 소식과 보도자료, 이벤트 소식을 확인하세요. <br />
            언제나 혁신적인 기술과 서비스로 여러분과 함께합니다.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#f0f9ff"
            fillOpacity="1"
            d="M0,64L60,64C120,64,240,64,360,69.3C480,75,600,85,720,80C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
