'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndexPage() {
  const router = useRouter(); // 라우팅 제어를 위한 훅

  useEffect(() => {
    // 세션 스토리지에서 adminToken 확인
    const token = sessionStorage.getItem("adminToken");
  
    if (token) {
      // 토큰이 있으면 관리자 뉴스레터 페이지로 이동
      router.replace("/admin/newsletter");
    } else {
      // 없으면 로그인 페이지로 리다이렉트
      router.replace("/admin/login");
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 이 페이지는 중간 리디렉션용이므로 렌더링할 UI 없음
  return null;
}