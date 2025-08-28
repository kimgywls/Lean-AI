"use client";

export default function AdminFooter() {
  return (
    <>
      <footer className="mt-6 text-center">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-gray-100">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} 관리자 시스템. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </>
  );
}
