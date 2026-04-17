"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { TextEffect } from "@/components/ui/text-effect";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[100dvh] bg-[#09090b] flex flex-col overflow-hidden">
      {/* Subtle dot pattern background */}
      <DotPattern className="absolute inset-0 opacity-[0.30] text-white [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,transparent_20%,black_100%)]" />

      {/* Soft glow accents */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-08 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pt-16 pb-10">
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
          <h1 className="font-display text-5xl font-bold text-white leading-tight mb-4">
            <TextEffect per="word" delay={0.1}>Money that makes sense</TextEffect>
          </h1>
          <p className="font-body text-base text-white/50 leading-relaxed max-w-xs">
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
                className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.10] text-white/60 text-xs font-body font-medium px-3 py-1.5 rounded-full"
              >
                <CheckCircle2 size={12} className="text-pri-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 mt-10 animate-fade-up d4">
          <ShimmerButton
            onClick={() => router.push("/sign-up")}
            className="w-full py-4 font-body font-semibold text-base"
            background="rgba(16, 185, 129, 0.12)"
            shimmerColor="#34D399"
            borderRadius="12px"
          >
            Create Account
          </ShimmerButton>
          <button
            onClick={() => router.push("/sign-in")}
            className="w-full py-4 rounded-xl font-body font-semibold text-base text-white/80 border border-white/[0.12] bg-transparent active:scale-95 transition-transform hover:bg-white/[0.04]"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
