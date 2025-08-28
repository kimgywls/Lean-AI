"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import InquiryModal from "@/components/modal/inquiry/InquiryModal";

export default function ContactSection() {
  const [iquiryModalOpen, setIquiryModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  return (
    <section
      id="contact"
      className="py-10 md:py-20 bg-gradient-to-b from-sky-100 to-sky-200 w-full overflow-hidden font-ibm"
    >
      <motion.div
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl transform -rotate-1 scale-105 opacity-10"></div>
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left flex-1">
                <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
                  더 궁금한 점이 있다면,
                  <br className="hidden md:block" /> 지금 LEAN-AI에 문의 주세요
                </h3>
                <p className="text-gray-600 text-base md:text-lg">
                  맞춤형 AI 솔루션에 대한 상담을 통해 비즈니스에 최적화된
                  서비스를 제안해 드립니다.
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex-shrink-0">
                <button
                  onClick={() => setIquiryModalOpen(true)}
                  className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 text-base sm:text-lg"
                >
                  문의하기
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 문의하기 모달 */}
      <InquiryModal
        isOpen={iquiryModalOpen}
        onClose={() => setIquiryModalOpen(false)}
        onSubmit={() => setIquiryModalOpen(false)}
      />
    </section>
  );
}
