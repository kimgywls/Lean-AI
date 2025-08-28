"use client";

import { Trash, X, AlertCircle } from "lucide-react";

export default function TemplateDeleteModal({ isOpen, onClose, onConfirm, templateTitle }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 bg-red-50">
          <h3 className="text-lg font-bold text-red-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" /> 템플릿 삭제 확인
          </h3>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-2">
            <strong>"{templateTitle}"</strong> 템플릿을 삭제하시겠습니까?
          </p>
          <p className="text-sm text-gray-500">이 작업은 되돌릴 수 없습니다.</p>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center"
            onClick={onConfirm}
          >
            <Trash className="h-4 w-4 mr-2" /> 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
