"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { User, AlertCircle, RefreshCw } from "lucide-react";
import Pagination from "@/components/common/TablePagination";
import Spinner from "@/components/ui/Spinner";

export default function SubscribersTab({ token }) {
  const [subscribers, setSubscribers] = useState([]); // 전체 구독자
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const totalPages = Math.ceil(subscribers.length / itemsPerPage); // 전체 페이지 수
  const itemsPerPage = 10; // 페이지 당 아이템 수
  const [error, setError] = useState(null); // 에러 메시지 상태

  //  토큰이 있을 때 구독자 불러오기
  useEffect(() => {
    if (token) fetcSubscribershData();
  }, [token]);

  // 구독자 목록 불러오기
  const fetcSubscribershData = async () => {
    try {
      //console.log("토큰으로 요청 시도:", token);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/email-subscribers/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      //console.log("구독자 데이터:", data);
      // 방어 코드: 배열일 경우만 세팅
      if (Array.isArray(data)) {
        setSubscribers(data);
        setError(null);
      } else {
        setSubscribers([]); // 잘못된 응답일 경우 비워줌
        setError("구독자 데이터를 불러오는 데 문제가 발생했습니다.");
      }
    } catch (err) {
      console.error("구독자 목록 불러오기 실패:", err);
      if (err.response) {
        console.log("에러 응답:", err.response.status, err.response.data);
        setError(
          `오류 ${err.response.status}: ${
            err.response.data.detail || "인증에 실패했습니다"
          }`
        );
      } else {
        setError("서버 연결에 실패했습니다");
      }
    } finally {
      setLoading(false);
    }
  };

  // 현재 페이지에 해당하는 구독자 리스트 추출
  const getCurrentPageSubscribers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return subscribers.slice(startIndex, endIndex);
  };

  return (
    <div className="p-8 bg-white">
      {/* 에러 메시지 박스 */}
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">
              {error || "세션이 만료되었습니다. 다시 로그인해주세요."}
            </span>
          </div>
        </div>
      )}

      {/* 상단 타이틀 + 새로고침 버튼 */}
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mr-1">구독자 목록</h2>
        <button
          onClick={fetcSubscribershData}
          className="p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-colors"
          title="새로고침"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* 로딩 중일 때 스피너 */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Spinner />
        </div>
      ) : Array.isArray(subscribers) && subscribers.length === 0 && !error ? (
        // 데이터가 없을 경우
        <div className="bg-gray-50 rounded-xl shadow-sm p-12 text-center">
          <div className="flex justify-center mb-4">
            <User className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            구독자가 없습니다
          </h3>
          <p className="text-gray-500">아직 등록된 메일이 없습니다.</p>
        </div>
      ) : (
        // 구독자 목록 테이블
        Array.isArray(subscribers) &&
        !error && (
          <div className="border border-sky-200 bg-white rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-sky-50 text-sky-700 font-medium">
                <tr>
                  <th className="px-4 py-3 border-b">순번</th>
                  <th className="px-4 py-3 border-b">이메일</th>
                  <th className="px-4 py-3 border-b">구독일</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageSubscribers().map((sub, idx) => {
                  const date = new Date(sub.subscribed_at);
                  const formattedDate = `${date.getFullYear()}.${String(
                    date.getMonth() + 1
                  ).padStart(
                    2,
                    "0"
                  )}.${String(date.getDate()).padStart(2, "0")}`;
                  return (
                    <tr key={idx} className="border-t transition">
                      <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                      <td className="px-4 py-3  hover:underline hover:text-blue-400">
                        {sub.email}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {formattedDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
