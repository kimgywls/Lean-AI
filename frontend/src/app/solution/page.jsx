import { Suspense } from "react";
import SolutionPageClient from "@/components/solution/SolutionPageClient";

export default function SolutionPage() {
  return (
    // ✅ Suspense 컴포넌트: 동적 import나 비동기 컴포넌트가 로딩 중일 때 fallback UI를 표시함
    <Suspense fallback={<div>로딩 중...</div>}>
      {/* ✅ 실제 콘텐츠를 렌더링하는 클라이언트 컴포넌트 */}
      <SolutionPageClient />
    </Suspense>
  );
}