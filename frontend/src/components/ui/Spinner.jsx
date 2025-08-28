// components/common/Spinner.jsx
"use client";
import React from "react";

export default function Spinner({ size = 24, color = "text-blue-500", label = "" }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-2">
      <svg
        className={`animate-spin ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  );
}

