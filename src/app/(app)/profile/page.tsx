"use client";

import { useRouter } from "next/navigation";
import { USER } from "@/lib/data/user";
import {
  Star,
  User,
  Shield,
  Bell,
  CreditCard,
  Target,
  Award,
  HelpCircle,
  MessageCircle,
  LogOut,
  Camera,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

const initials = USER.name
  .split(" ")
  .map((n) => n[0])
  .join("")
  .toUpperCase();

interface MenuItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  sub: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Info", sub: "Name, email, phone" },
      { icon: Shield, label: "Privacy & Security", sub: "PIN, biometrics" },
      { icon: Bell, label: "Notifications", sub: "Alerts and reminders" },
    ],
  },
  {
    title: "Finance",
    items: [
      { icon: CreditCard, label: "Linked Accounts", sub: "Banks and cards" },
      { icon: Target, label: "Budget Goals", sub: "Set monthly limits" },
      { icon: Award, label: "Rewards & Perks", sub: "Cashback and offers" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", sub: "FAQs and guides" },
      { icon: MessageCircle, label: "Contact Us", sub: "Chat or email" },
    ],
  },
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="pb-6">
      {/* Dark header */}
      <div className="bg-n-950 border-b border-white/[0.07] p-5 pb-10 relative">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center mb-4 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>

        {/* Avatar + camera */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-pri-400 to-pri-600 flex items-center justify-center font-display font-bold text-2xl text-white shadow-lg">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-n-50 transition-colors">
              <Camera size={12} className="text-n-600" />
            </button>
          </div>

          <p className="font-display font-bold text-white text-[18px]">{USER.name}</p>
          <p className="font-body text-[12px] text-white/60 mb-2">priya@example.com</p>

          <div className="flex items-center gap-1.5 bg-warn-400/20 border border-warn-400/30 rounded-full px-3 py-1">
            <Star size={12} className="text-warn-400 fill-warn-400" />
            <span className="font-body text-[11px] text-warn-300 font-medium">Gold member</span>
            <span className="font-body text-[11px] text-white/50 mx-1">·</span>
            <span className="font-display font-bold text-[12px] text-white">{USER.creditScore}</span>
          </div>
        </div>
      </div>

      {/* Stats cards — overlapping the header */}
      <div className="grid grid-cols-3 gap-2.5 -mt-5 mx-4 relative z-10 mb-5">
        <div className="bg-[#161616] rounded-xl p-3 border border-white/[0.07] text-center">
          <p className="font-display font-bold text-[16px] text-white">{USER.onTimeStreak}</p>
          <p className="font-body text-[10px] text-white/35 leading-tight mt-0.5">On-time streak</p>
        </div>
        <div className="bg-[#161616] rounded-xl p-3 border border-white/[0.07] text-center">
          <p className="font-display font-bold text-[16px] text-white">
            ₹{(USER.savedViaGoodBehavior / 1000).toFixed(1)}K
          </p>
          <p className="font-body text-[10px] text-white/35 leading-tight mt-0.5">Saved</p>
        </div>
        <div className="bg-[#161616] rounded-xl p-3 border border-white/[0.07] text-center">
          <p className="font-display font-bold text-[14px] text-white">Oct &apos;25</p>
          <p className="font-body text-[10px] text-white/35 leading-tight mt-0.5">Member since</p>
        </div>
      </div>

      {/* Menu sections */}
      <div className="mx-4 space-y-4">
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="font-body text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
              {section.title}
            </p>
            <div className="bg-[#161616] rounded-xl border border-white/[0.07] overflow-hidden">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-white/[0.04] transition-colors ${
                      i < section.items.length - 1 ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-white/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-medium text-[13px] text-white/80">{item.label}</p>
                      <p className="font-body text-[11px] text-white/35">{item.sub}</p>
                    </div>
                    <ChevronRight size={15} className="text-white/20 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center justify-center gap-2 border border-err-500/25 bg-err-500/10 text-err-400 rounded-xl py-3.5 font-display font-semibold text-[14px] active:bg-err-500/15 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>

        {/* Version footer */}
        <p className="text-center font-body text-[10px] text-white/20 pt-1">
          SpendSmart v1.0 · Made with care in India
        </p>
      </div>
    </div>
  );
}
