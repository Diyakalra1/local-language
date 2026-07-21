// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import { Moon, Sun, Languages } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuthStore();
  const { isDarkMode, toggleTheme, initTheme } = useThemeStore();

  const navigate = useNavigate();

  useEffect(() => {
    initTheme();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login({
      email,
      password,
    });

    if (success) navigate("/home");
  };

  return (
<div className="min-h-screen bg-[#FFFFFF] dark:bg-gray-900 flex items-center justify-center px-6 lg:px-16 py-10">   
<div className="grid lg:grid-cols-2 items-center w-full max-w-7xl gap-16">      
<div className="hidden lg:flex flex-col justify-center px-8">          <img
            src="/logo.png"
            alt="LLI"
            className="w-full max-w-md mx-auto"
          />

          <h1 className="text-5xl font-bold text-[#12355B] leading-tight">
            One India.
            <br />
            Every Language.
          </h1>

<p className="mt-8 text-2xl leading-10 text-slate-600 max-w-2xl font-medium">            Connect with anyone across India in their own language.
            Real-time multilingual messaging powered by instant translation.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-center gap-4 bg-white rounded-3xl shadow-md p-5 border border-orange-100">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                💬
              </div>

              <div>
                <h3 className="font-semibold text-[#12355B]">
                  Real-Time Chat
                </h3>
                <p className="text-sm text-slate-500">
                  Instant multilingual conversations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-3xl shadow-md p-5 border border-orange-100">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                🎤
              </div>

              <div>
                <h3 className="font-semibold text-[#12355B]">
                  Voice Translation
                </h3>
                <p className="text-sm text-slate-500">
                  Speak naturally in your preferred language.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-3xl shadow-md p-5 border border-orange-100">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                🌏
              </div>

              <div>
                <h3 className="font-semibold text-[#12355B]">
                  14+ Indian Languages
                </h3>
                <p className="text-sm text-slate-500">
                  Built specifically for India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white dark:bg-gray-800 rounded-[36px] shadow-2xl border border-orange-100 p-10 w-full max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-8">
            <img
              src="/logo.png"
              alt="LLI"
              className="w-16 h-16"
            />

            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <h2 className="text-4xl font-bold text-[#12355B]">
            Welcome Back 👋
          </h2>

          <p className="text-2xl text-slate-500 mt-3 mb-8">
            Continue your multilingual conversations.
          </p>

          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 text-red-600 px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className=" text-2xl text-slate-600 mb-2 block">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="text-2xl w-full rounded-2xl border border-gray-200 px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-2xl text-slate-600 mb-2 block">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className=" w-full rounded-2xl border border-gray-200 px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition"
              />
            </div>

            <button
              disabled={loading}
              className="text-2xl w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* FEATURES */}

<div className="mt-8 border-t border-orange-100 pt-6">

  <h3 className="text-xl font-semibold text-[#12355B] mb-4">
    Key Features
  </h3>

  <ul className="space-y-3 text-[15px] text-slate-600 leading-7">

    <li className="flex gap-3">
      <span className="text-orange-500 font-bold">•</span>
      <p className="text-2xl">Real-time multilingual messaging.</p>
    </li>

    

    <li className="flex gap-3">
      <span className="text-2xl text-orange-500 font-bold">•</span>
      <p className="text-2xl" >Voice-to-text and speech translation.</p>
    </li>

    <li className="flex gap-3">
      <span className="text-orange-500 font-bold">•</span>
      <p className="text-2xl" >Supports 14+ Indian languages.</p>
    </li>

  </ul>

</div>

<p className=" text-4xl text-center mt-8 ">
  Don't have an account?{" "}
  <Link
    to="/register"
    className=" text-2xl font-semibold text-orange-600 hover:text-orange-700"
  >
    Create Account
  </Link>
</p>
        </div>
      </div>
    </div>
  );
}