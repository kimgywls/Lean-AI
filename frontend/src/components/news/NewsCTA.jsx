// NewsCTA.js
"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Mail,
  ArrowRight,
  Bell,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RecruitModal from "@/components/modal/recruit/RecruitModal";
import SuccessModal from "@/components/modal/common/SuccessModal";
import ErrorModal from "@/components/modal/common/ErrorModal";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function NewsCTA() {
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [recruitModalOpen, setRecruitModalOpen] = useState(false);


  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("올바른 이메일 형식이 아닙니다.");
      setErrorOpen(true);
      return;
    }

    try {
      const res = await axios.post(
        `${API_DOMAIN}/api/newsletter/email-subscribers/`,
        {
          email,
        }
      );

      if (res.status === 201) {
        setMessage("구독 신청이 완료되었습니다. 감사합니다!");
        setModalOpen(true);
        setEmail("");
      } else {
        setErrorMsg("예상치 못한 응답입니다. 다시 시도해주세요.");
        setErrorOpen(true);
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.email?.[0] ||
          "이미 구독했거나 잘못된 이메일입니다."
      );
      setErrorOpen(true);
    }
  };

  const handleJobSelect = (url) => {
    setRecruitModalOpen(false);
    window.open(url, "_blank");
  };

  return (
    <section className="container mx-auto px-4 py-16 font-ibm">
      {/* 뉴스레터 섹션 */}
      <div className="mb-16">
        <motion.div
          className="rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500 shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* 애니메이션 배경 */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white opacity-10"
              animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-white opacity-10"
              animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -30, 0] }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          <div className="md:flex items-center relative z-10">
            <div className="w-full md:w-1/2 px-6 py-6 md:py-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 transition-all backdrop-blur-sm">
                  <Bell className="h-3.5 w-3.5 mr-1.5" />
                  구독 신청
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  뉴스레터 구독
                </h2>
                <p className="text-blue-50 mb-6 text-lg leading-relaxed whitespace-normal md:whitespace-nowrap">
                  LEAN-AI의 최신 소식과 업데이트를 가장 먼저 이메일로
                  받아보세요.
                  <br /> 언제든지 구독을 취소할 수 있습니다.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubscribe();
                  }}
                  className="flex flex-col md:flex-row gap-3 w-full"
                >
                  <div className="relative flex-grow">
                    <div
                      className={`absolute left-0 top-0 h-full w-10 flex items-center justify-center transition-all duration-300 ${
                        isEmailFocused ? "text-white" : "text-blue-100"
                      }`}
                    >
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="이메일 주소 입력"
                      className={`border-transparent text-white py-6 pl-10 rounded-xl transition-all duration-300 ${
                        isEmailFocused
                          ? "bg-white/30 focus-visible:ring-white placeholder:text-blue-50"
                          : "bg-white/20 focus-visible:ring-white/50 placeholder:text-blue-100"
                      }`}
                      onFocus={() => setIsEmailFocused(true)}
                      onBlur={() => setIsEmailFocused(false)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 py-6 px-6 rounded-xl font-medium group"
                    style={{ fontSize: "17px" }}
                  >
                    구독하기
                    <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 채용 정보 섹션 - 완전히 새로운 디자인 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white/70 text-gray-600 border-4 border-blue-400">
          {/* Header section with wave overlay */}
          <div className="relative py-12 md:py-16 px-6 md:px-12 text-center">
            <div className="absolute inset-0 b -z-10"></div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 mx-auto max-w-3xl"
            >
              <Badge className="mb-4 bg-cyan-400/70 text-white transition-all backdrop-blur">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                채용 정보
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-sky-400 mb-6 leading-tight">
                함께 혁신을 만들어갈 <br className="md:hidden" /> 인재를
                찾습니다
              </h2>
              <p className="text-gray-600 text-xl mb-8 leading-relaxed mx-auto max-w-2xl">
                LEAN-AI는 AI 기술을 통해 세상을 변화시키고 있습니다. <br/>우리와 함께
                미래를 창조할 열정적이고 창의적인 인재들을 기다립니다.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => setRecruitModalOpen(true)}
                  className="text-white bg-blue-400/70 hover:bg-blue-400 py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontSize: "17px" }}
                >
                  전체 채용 공고 보기
                </Button>
                <Button
                  onClick={() => setRecruitModalOpen(true)}
                  className="text-white bg-sky-400/70 hover:bg-sky-400 py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontSize: "17px" }}
                >
                  기업 문화 알아보기
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <RecruitModal
        isOpen={recruitModalOpen}
        onClose={() => setRecruitModalOpen(false)}
        onSelect={handleJobSelect}
      />
      <SuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={message}
      />
      <ErrorModal
        isOpen={errorOpen}
        onClose={() => setErrorOpen(false)}
        message={errorMsg}
      />
    </section>
  );
}
