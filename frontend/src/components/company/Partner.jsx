"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// 협력사 목록 (이름과 로고 경로 포함)
const partners = [
  { name: "Naver", logo: "/logos/naver.svg" },
  { name: "Kakao", logo: "/logos/kakao.svg" },
  { name: "Samsung", logo: "/logos/samsung.svg" },
  { name: "LG", logo: "/logos/lg.svg" },
  { name: "Coupang", logo: "/logos/coupang.svg" },
  { name: "SK", logo: "/logos/sk.svg" },
  { name: "Hyundai", logo: "/logos/hyundai.svg" },
];

const Partner = () => {
  return (
    <div className="relative overflow-hidden py-6 md:py-12 px-0 md:px-4 font-ibm">
      {/* 제목 */}
      <div className="text-center relative z-10 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold"
        >
          <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 bg-clip-text text-transparent mb-4 font-gmarket">
            PARTNER
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-gray-600 max-w-xl mx-auto text-base md:text-xl font-medium mt-3"
        >
          LEAN-AI와 함께하는 <br className="block md:hidden" /> 협력사들을
          소개합니다.
        </motion.p>
      </div>

      {/* 로고 */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center bg-white bg-opacity-70 rounded-xl shadow-xl p-3">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-3 grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain h-12 w-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partner;
