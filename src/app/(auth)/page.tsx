"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-n-900 via-pri-900 to-pri-800 flex flex-col overflow-hidden">
      {/* Decorative orbs */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, #10b981 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, #6366f1 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col flex-1 px-6 pt-16 pb-10">
        {/* Logo */}
        <div className="mb-10 animate-fade-up d1">
          <div className="w-14 h-14 rounded-xl bg-pri-500/20 border border-pri-400/30 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
                fill="#10b981"
                fillOpacity="0.9"
              />
              <path
                d="M9 21V15H15V21"
                stroke="#6ee7b7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="flex-1 animate-fade-up d2">
          <h1 className="font-display text-5xl font-bold text-n-0 leading-tight mb-4">
            Money that<br />makes sense
          </h1>
          <p className="font-body text-base text-n-0/60 leading-relaxed max-w-xs">
            Track spending, manage BNPL plans, get AI insights — all in one app
            built for India.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mt-8 animate-fade-up d3">
            {[
              "RBI Compliant",
              "Bank-grade Security",
              "10M+ Users",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-n-0/10 border border-n-0/20 text-n-0/80 text-xs font-body font-medium px-3 py-1.5 rounded-full"
              >
                <CheckCircle2 size={12} className="text-pri-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 mt-10 animate-fade-up d4">
          <button
            onClick={() => router.push("/sign-up")}
            className="w-full py-4 rounded-xl font-body font-semibold text-base text-n-0 bg-gradient-to-r from-pri-500 to-pri-600 shadow-lg shadow-pri-900/40 active:scale-95 transition-transform"
          >
            Create Account
          </button>
          <button
            onClick={() => router.push("/sign-in")}
            className="w-full py-4 rounded-xl font-body font-semibold text-base text-n-0 border border-n-0/30 bg-transparent active:scale-95 transition-transform"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
