"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home as HomeIcon, BarChart3, CreditCard, Sparkles } from "lucide-react";
import { Star } from "lucide-react";
import { USER } from "@/lib/data/user";
import { DotPattern } from "@/components/ui/dot-pattern";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

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
    <div className="relative flex flex-col min-h-[100dvh] bg-n-950 overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-[0.25] text-white [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,black_100%)]" />
      {/* Header */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-n-950 border-b border-white/[0.07] px-5 pt-12 pb-5">
        <div className="flex items-center justify-between">
          {/* Left: avatar + greeting */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/profile")}
              className="w-10 h-10 rounded-full overflow-hidden shadow-md active:scale-95 transition-transform"
            >
              <img src="/profile.jpg" alt={USER.name} className="w-full h-full object-cover" />
            </button>
            <div>
              <p className="font-body text-xs text-n-0/50">{getGreeting()}</p>
              <p className="font-display text-base font-bold text-n-0 leading-tight">
                {USER.name}
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
        className={`relative z-10 flex-1 mt-[104px] pb-20 ${
          isAdvisor ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        {children}
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-n-950/95 backdrop-blur-md border-t border-white/[0.07]">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <button
                key={href}
                onClick={() => router.push(href)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl active:scale-95 transition-all duration-200 ${
                  isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-pri-400" : "text-white/30"}
                />
                <span
                  className={`font-body text-[10px] font-medium ${
                    isActive ? "text-pri-400" : "text-white/30"
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
