"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

// 환경 변수에서 카카오 지도 API 키 가져오기
const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

const Location = () => {
  useEffect(() => {
    if (!KAKAO_MAP_API_KEY) {
      console.error(
        "Kakao Map API Key is missing. Check your .env.local file."
      );
      return;
    }

    const scriptId = "kakao-map-script";

    // 중복 삽입 방지
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;

      // 스크립트가 성공적으로 로드되면 지도 생성
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById("kakao-map");
            if (!container) {
              console.error("Map container not found.");
              return;
            }

            const options = {
              center: new window.kakao.maps.LatLng(
                37.4784971751249,
                126.958548705707
              ),
              level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);

            new window.kakao.maps.Marker({
              map,
              position: options.center,
            });
          });
        } else {
          console.error("Kakao SDK loaded, but window.kakao.maps is missing");
        }
      };
      // 로드 실패 시 콘솔에 출력
      script.onerror = () => {
        console.error("❌ Failed to load Kakao Maps SDK");
      };
      document.head.appendChild(script);
    } else {
      // 이미 로드된 경우 바로 실행
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById("kakao-map");
          if (!container) return;

          const options = {
            center: new window.kakao.maps.LatLng(37.48115, 126.95375),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);
          new window.kakao.maps.Marker({
            map,
            position: options.center,
          });
        });
      }
    }
  }, []);

  return (
    <div className="relative overflow-hidden py-6 md:py-12 px-0 md:px-4 font-ibm">
      <div className="text-center relative z-10 mb-10">
        {/* 상단 제목 영역 */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold"
        >
          <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 bg-clip-text text-transparent mb-4 font-gmarket">
            FIND US
          </span>
        </motion.h2>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl p-4 md:p-8 shadow-xl">
        {/* 연락처 정보 */}
        <div>
          <h3 className="text-xl md:text-3xl font-bold text-sky-700 mb-4">
            연락처
          </h3>
          <ul className="space-y-3 text-gray-700 text-lg md:text-xl">
            <li>
              <strong>주소</strong> <br />
              <span className="px-2">
                서울시 관악구 봉천로 545, 서울창업센터 관악 201호
              </span>
            </li>
            <li>
              <strong>전화</strong> <br />
              <span className="px-2">02-6951-1510</span>
            </li>
            <li>
              <strong>이메일</strong> <br />
              <span className="px-2">ch@LEAN-AI.com</span>
            </li>
          </ul>
        </div>

        {/* Kakao 지도 */}
        <div>
          <h3 className="text-xl md:text-3xl font-bold text-sky-700 mb-4">
            오시는 길
          </h3>
          <div
            id="kakao-map"
            className="w-full h-[300px] rounded-xl overflow-hidden shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
