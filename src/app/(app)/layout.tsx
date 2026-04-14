"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home as HomeIcon, BarChart3, CreditCard, Sparkles } from "lucide-react";
import { Star } from "lucide-react";
import { USER } from "@/lib/data/user";

const tabs = [
  { label: "Home", href: "/home", icon: HomeIcon },
  { label: "Spend", href: "/spend", icon: BarChart3 },
  { label: "BNPL", href: "/bnpl", icon: CreditCard },
  { label: "Advisor", href: "/advisor", icon: Sparkles },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isAdvisor = pathname.includes("/advisor");

  return (
    <div className="flex flex-col min-h-screen bg-n-50">
      {/* Header */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-gradient-to-br from-n-900 via-pri-900 to-pri-800 px-5 pt-12 pb-5">
        {/* Decorative orb */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-between">
          {/* Left: avatar + greeting */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/profile")}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-pri-400 to-pri-600 flex items-center justify-center font-display font-bold text-n-0 text-base shadow-md active:scale-95 transition-transform"
            >
              {USER.name.charAt(0)}
            </button>
            <div>
              <p className="font-body text-xs text-n-0/50">Hi, {USER.name}</p>
              <p className="font-display text-base font-bold text-n-0 leading-tight">
                SpendSmart
              </p>
            </div>
          </div>

          {/* Right: credit score badge */}
          <div className="flex items-center gap-1.5 bg-n-0/10 border border-n-0/20 rounded-full px-3 py-1.5">
            <Star size={12} className="text-warn-400 fill-warn-400" />
            <span className="font-display text-sm font-bold text-n-0">
              {USER.creditScore}
            </span>
            <span className="font-body text-xs text-pri-300 font-medium">
              +{USER.scoreChange}
            </span>
          </div>
        </div>
      </header>

      {/* Content area */}
      <main
        className={`flex-1 mt-[104px] pb-20 ${
          isAdvisor ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        {children}
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-white/95 backdrop-blur-md border-t border-n-100">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <button
                key={href}
                onClick={() => router.push(href)}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl active:scale-95 transition-transform"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-pri-600" : "text-n-400"}
                />
                <span
                  className={`font-body text-[10px] font-medium ${
                    isActive ? "text-pri-600" : "text-n-400"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
