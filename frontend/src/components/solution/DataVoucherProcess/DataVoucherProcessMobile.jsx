// components/DataVoucherProcess/DataVoucherProcessMobile.jsx
import {
    CalendarCheck,
    Users,
    FileText,
    FileUp,
    HeartHandshake,
  } from "lucide-react";
  
  const steps = [
    {
      title: "미팅 전",
      icon: <CalendarCheck className="w-5 h-5 text-sky-500" />,
      description: <>설문내용 검토 및<br />미팅 일정 조정</>,
    },
    {
      title: "미팅 당일",
      icon: <Users className="w-5 h-5 text-sky-500" />,
      description: <>수집/가공데이터 및<br />항목 타임라인 논의</>,
    },
    {
      title: "미팅 이후",
      icon: <FileText className="w-5 h-5 text-sky-500" />,
      description: <>사업계획서 작성 및<br />발표영상 준비</>,
    },
    {
      title: "서류제출",
      icon: <FileUp className="w-5 h-5 text-sky-500" />,
      description: <>수요기업 서류제출</>,
    },
    {
      title: "최종",
      icon: <HeartHandshake className="w-5 h-5 text-sky-500" />,
      description: <>협약서류 준비 및<br />최종 데이터 가공방안 확정</>,
    },
  ];
  
  export default function DataVoucherProcessMobile() {
    return (
      <div className="block md:hidden grid grid-cols-1 gap-4 mt-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex sm:flex-col items-start sm:items-center gap-3"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full shrink-0">
              {step.icon}
            </div>
            <div className="text-left sm:text-center flex-1">
              <div className="text-gray-800 font-semibold text-base sm:text-lg mb-1">
                {step.title}
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-snug">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  