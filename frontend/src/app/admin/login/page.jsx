// @/app/admin/login/page

"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  CircleCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Check,
  Loader,
  CheckSquare,
  Square,
} from "lucide-react";
import AdminFooter from "@/components/common/AdminFooter";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/newsletter/admin/login/`,
        JSON.stringify({ username, password }),
        { headers: { "Content-Type": "application/json" } }
      );
      sessionStorage.setItem("adminToken", res.data.token);
      router.push("/admin/newsletter");
    } catch (err) {
      console.error("로그인 오류:", err);
      if (err.response?.status === 401) {
        setErrorMsg("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else if (err.response?.data?.detail) {
        setErrorMsg(err.response.data.detail);
      } else {
        setErrorMsg("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-md w-full z-10">
        <div
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-sm bg-white/95 relative overflow-hidden font-nanumsquareround"
          data-testid="admin-login-card"
        >
          <div className="text-center relative z-10" data-testid="login-header">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl mb-6 shadow-md">
              <CircleCheck className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              관리자 포털
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              계정 정보를 입력하여 로그인하세요
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleLogin}
            data-testid="login-form"
          >
            <div className="rounded-md space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center"
                >
                  아이디<span className="ml-1 text-sky-500 text-xs">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    required
                    data-testid="input-username"
                    className="appearance-none rounded-lg relative block w-full pl-11 pr-4 py-3 border border-gray-300"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {username && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-500">
                      <Check className="h-5 w-5" />
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center"
                >
                  비밀번호<span className="ml-1 text-sky-500 text-xs">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    data-testid="input-password"
                    className="appearance-none rounded-lg relative block w-full pl-11 pr-11 py-3 border border-gray-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    data-testid="toggle-password"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label
                htmlFor="remember-checkbox"
                className="flex items-center gap-2 cursor-pointer select-none"
                data-testid="toggle-remember"
              >
                <input
                  id="remember-checkbox"
                  type="checkbox"
                  className="hidden"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  data-testid="remember-checkbox"
                />
                {rememberMe ? (
                  <CheckSquare className="h-4 w-4 text-sky-500" />
                ) : (
                  <Square className="h-4 w-4 text-gray-400" />
                )}
                <span className="text-sm text-gray-700">
                  로그인 정보 기억하기
                </span>
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-sky-600 hover:text-sky-500"
                  data-testid="forgot-password-link"
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>

            {errorMsg && (
              <div
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start"
                data-testid="error-message"
              >
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                <div>
                  <p className="text-sm font-medium">로그인 실패</p>
                  <p className="text-sm mt-1">{errorMsg}</p>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                data-testid="login-button"
                className={`group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white shadow-sm ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    로그인 중
                  </>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LogIn className="h-5 w-5 text-sky-300" />
                    </span>
                    로그인
                  </>
                )}
              </button>
            </div>
          </form>

          <div
            className="mt-6 bg-sky-50 rounded-lg p-3 border border-sky-100"
            data-testid="login-alert"
          >
            <div className="flex items-start text-xs text-sky-700">
              <AlertCircle className="h-4 w-4 mr-1.5 mt-0.5 text-sky-500" />
              <span>
                관리자 계정은 철저히 관리되어야 합니다. <br />
                로그인 후에는 꼭 로그아웃해 주세요.
              </span>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}
