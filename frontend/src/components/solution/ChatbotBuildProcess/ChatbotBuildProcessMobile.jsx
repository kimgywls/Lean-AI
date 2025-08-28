"use client";

import {
  CheckCircle2,
  FileText,
  BrainCircuit,
  Shapes,
  Funnel,
} from "lucide-react";

export default function AIBuildProcessMobile() {
  const steps = [
    {
      title: "데이터 수집 및 분석",
      icon: <Shapes className="w-6 h-6 text-indigo-500" />,
      desc: "FAQ, 사내 문서 등을 수집하고 구조화합니다.",
    },
    {
      title: "데이터 전처리",
      icon: <Funnel className="w-6 h-6 text-indigo-500" />,
      desc: "중복 제거와 오류 수정을 통해 데이터셋을 정제합니다.",
    },
    {
      title: "대화 시나리오 설계",
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      desc: "의도 분류와 흐름 설계로 자연스러운 대화를 만듭니다.",
    },
    {
      title: "AI 모델 학습",
      icon: <BrainCircuit className="w-6 h-6 text-indigo-500" />,
      desc: "RAG 기반 모델을 학습하고 성능을 개선합니다.",
    },
    {
      title: "성능 검증 및 최적화",
      icon: <CheckCircle2 className="w-6 h-6 text-indigo-500" />,
      desc: "테스트를 통해 품질을 검증하고 최적화합니다.",
    },
  ];

  return (
    <div className="md:hidden space-y-3 mt-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-start bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="bg-indigo-100 rounded-lg p-2 mr-3 flex items-center justify-center">
            {step.icon}
          </div>
          <div>
            <div className="text-gray-800 font-medium">{step.title}</div>
            <p className="text-xs text-gray-600 mt-1">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
