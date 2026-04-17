"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFilled = email.trim() !== "" && password.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFilled) return;
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/home");
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col px-6 pt-12 pb-10">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-8 w-10 h-10 rounded-full border border-white/[0.10] flex items-center justify-center text-white/60 active:scale-95 transition-transform hover:bg-white/[0.05]"
      >
        <ArrowLeft size={18} />
      </button>

      <h1 className="font-display text-3xl font-bold text-white mb-1">
        Welcome back
      </h1>
      <p className="font-body text-sm text-white/40 mb-8">
        Sign in to your SpendSmart account
      </p>

      {/* Google button */}
      <button className="w-full flex items-center justify-center gap-3 border border-white/[0.10] rounded-xl py-3.5 mb-6 font-body font-medium text-white/60 text-sm active:scale-95 transition-transform hover:bg-white/[0.04]">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
          <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
          <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
          <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="font-body text-xs text-white/20">or</span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/[0.10] bg-white/[0.05] font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-pri-400/60 transition-colors"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-white/[0.10] bg-white/[0.05] font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-pri-400/60 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 active:text-white/60"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Forgot password */}
        <div className="text-right -mt-1">
          <button type="button" className="font-body text-xs text-pri-400 font-medium">
            Forgot password?
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="font-body text-xs text-err-400 bg-err-500/10 rounded-lg px-4 py-2.5">
            {error}
          </p>
        )}

        {/* Submit */}
        {isFilled && !loading ? (
          <ShimmerButton
            type="submit"
            className="w-full py-4 font-body font-semibold text-base"
            background="rgba(16, 185, 129, 0.12)"
            shimmerColor="#34D399"
            borderRadius="12px"
          >
            Sign In
          </ShimmerButton>
        ) : (
          <button
            type="submit"
            disabled={!isFilled || loading}
            className="w-full py-4 rounded-xl font-body font-semibold text-base bg-white/[0.05] text-white/25 cursor-not-allowed transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        )}
      </form>

      <p className="font-body text-sm text-white/40 text-center mt-8">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => router.push("/sign-up")}
          className="text-pri-400 font-medium"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
