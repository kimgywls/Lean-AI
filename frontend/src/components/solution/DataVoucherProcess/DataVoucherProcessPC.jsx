// components/DataVoucherProcess/DataVoucherProcessPC.jsx
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
      icon: <CalendarCheck className="w-6 h-6 text-sky-500" />,
      desc: "설문내용 검토 및 \n 미팅 일정 조정",
    },
    {
      title: "미팅 당일",
      icon: <Users className="w-6 h-6 text-sky-500" />,
      desc: "수집/가공데이터 및 \n 항목 타임라인 논의",
    },
    {
      title: "미팅 이후",
      icon: <FileText className="w-6 h-6 text-sky-500" />,
      desc: "사업계획서 작성 및 \n 발표영상 준비",
    },
    {
      title: "서류제출",
      icon: <FileUp className="w-6 h-6 text-sky-500" />,
      desc: "수요기업 서류제출",
    },
    {
      title: "최종",
      icon: <HeartHandshake className="w-6 h-6 text-sky-500" />,
      desc: "협약서류 준비 및 \n 최종 데이터 방안 확정",
    },
  ];
  
  export default function DataVoucherProcessPC() {
    return (
      <div className="hidden md:grid grid-cols-5 gap-4 mt-6">
        {steps.map((step, index) => (
          <div key={index} className="p-4 text-center">
            <div className="bg-white rounded-lg p-3 mb-3 mx-auto w-14 h-14 flex items-center justify-center shadow-sm border border-gray-200">
              {step.icon}
            </div>
            <div className="text-gray-800 font-medium text-lg">{step.title}</div>
            <p className=" text-gray-600 mt-2 whitespace-pre-line tracking-tight">{step.desc}</p>
          </div>
        ))}
      </div>
    );
  }
  