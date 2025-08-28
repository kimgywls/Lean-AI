"use client";

import { Users, Bot, RefreshCcw, Handshake, Rocket } from "lucide-react";

export default function ChatbotProcessMobile() {
  const steps = [
    {
      title: "솔루션 상담",
      icon: <Handshake className="w-6 h-6 text-indigo-500" />,
      desc: "고객사의 비즈니스 유형과 요구사항을 파악하고, 무물 솔루션 도입을 위한 초기 상담을 진행합니다.",
    },
    {
      title: "맞춤형 기획",
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      desc: "고객사 환경에 최적화된 챗봇 기능 범위와 도입 계획을 함께 설계하고 업무 프로세스 개선 방안을 협의합니다.",
    },
    {
      title: "솔루션 구축",
      icon: <Bot className="w-6 h-6 text-indigo-500" />,
      desc: "고객사 데이터를 기반으로 솔루션을 개발하고, 시스템 연동 및 인터페이스 구축 과정을 진행합니다.",
    },
    {
      title: "테스트 및 배포",
      icon: <Rocket className="w-6 h-6 text-indigo-500" />,
      desc: "실제 환경에서의 성능 검증 및 사용성 테스트를 거쳐 완성된 챗봇을 고객사 시스템에 안전하게 배포합니다.",
    },
    {
      title: "사후 관리",
      icon: <RefreshCcw className="w-6 h-6 text-indigo-500" />,
      desc: "솔루션 운영 과정에서 발생하는 이슈 대응과 시스템 업데이트, 신규 데이터 반영 등 지속적인 관리를 제공합니다.",
    },
  ];

  return (
    <div className="md:hidden space-y-3 mt-4">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="flex items-start">
            <div
              className={`p-2 rounded-full bg-gradient-to-r ${step.color} text-white flex-shrink-0 mr-3`}
            >
              {step.icon}
            </div>

            <div>
              <h4 className="text-gray-800 font-semibold text-base">
                {step.step}
              </h4>
              <p className="text-gray-600 mt-1 text-sm">{step.desc}</p>

              {index === 0 && (
                <div className="mt-3 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <p className="text-indigo-700 text-sm">
                    고객사의 산업 분야, 비즈니스 목표, 현재 고객 응대 방식 등을
                    분석하여 최적의 챗봇 도입 전략을 함께 수립합니다.
                  </p>
                </div>
              )}

              {index === 2 && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                    <h5 className="text-indigo-700 font-semibold mb-1">
                      맞춤형 기능 구현
                    </h5>
                    <p className="text-gray-600 text-sm">
                      산업별 특화 기능과 기존 시스템 연동을 통한 통합 솔루션
                      제공
                    </p>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                    <h5 className="text-indigo-700 font-semibold mb-1">
                      단계적 도입 지원
                    </h5>
                    <p className="text-gray-600 text-sm">
                      핵심 기능부터 단계적 도입을 통해 조직 내 안정적인 적응을
                      지원합니다.
                    </p>
                  </div>
                </div>
              )}

              {index === 4 && (
                <div className="mt-3 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <p className="text-indigo-700 text-sm">
                    정기적인 성능 모니터링 및 업데이트, 신규 질문 패턴 분석,
                    사용자 피드백 반영을 통해 지속적으로 발전하는 챗봇 서비스를
                    제공합니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
