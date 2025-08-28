"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SolutionPageContent from "./SolutionPageContent"; // 너가 작성한 로직 부분을 여기에!

export default function SolutionPageClient() {
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  const validTabs = ["leanai", "mumul"];
  const initialTab = validTabs.includes(tabFromQuery) ? tabFromQuery : "leanai";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <SolutionPageContent
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}
