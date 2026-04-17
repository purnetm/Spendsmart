import { totalSpent, totalBudget, overCats } from "@/lib/data/categories";
import { PLANS } from "@/lib/data/plans";
import { USER } from "@/lib/data/user";
import { wasteCost } from "@/lib/data/subscriptions";
import { formatINR } from "@/lib/utils/format";
import { HomeCatList } from "@/components/home/home-cat-list";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const totalEMI = PLANS.reduce((s, p) => s + p.monthlyEMI, 0);
  const activePlanCount = PLANS.length;
  const streak = USER.onTimeStreak;

  const budgetPct = Math.round((totalSpent / totalBudget) * 100);
  const budgetDiff = totalBudget - totalSpent;
  const isOver = budgetDiff < 0;

  const barColor =
    budgetPct >= 100
      ? "bg-ora-500"
      : budgetPct >= 80
      ? "bg-warn-400"
      : "bg-pri-500";

  const nextDuePlan = PLANS.find((p) => p.nextDue === "Apr 15");

  return (
    <div className="px-4 py-4 pb-6">
      {/* A. Stats row */}
      <div className="grid grid-cols-2 gap-2 mb-3.5 animate-fade-up">
        {/* Spent this month */}
        <div className="relative overflow-hidden bg-[#161616] rounded-xl p-4 border border-white/[0.07]">
          <BorderBeam size={80} duration={8} colorFrom="#34D399" colorTo="#4F46E5" />
          <p className="font-body text-[11px] text-white/40 mb-1.5 uppercase tracking-wider">Spent</p>
          <p className="font-display font-extrabold text-[28px] text-white leading-none">
            ₹{(totalSpent / 1000).toFixed(1)}K
          </p>
          <p className={`font-body text-[11px] mt-1.5 ${isOver ? "text-ora-400" : "text-pri-400"}`}>
            {isOver
              ? `Over by ₹${Math.abs(budgetDiff / 1000).toFixed(1)}K`
              : `Under by ₹${(budgetDiff / 1000).toFixed(1)}K`}
          </p>
        </div>

        {/* Active EMIs */}
        <div className="relative overflow-hidden bg-[#161616] rounded-xl p-4 border border-white/[0.07]">
          <BorderBeam size={80} duration={8} colorFrom="#4F46E5" colorTo="#34D399" delay={4} />
          <p className="font-body text-[11px] text-white/40 mb-1.5 uppercase tracking-wider">EMIs</p>
          <p className="font-display font-extrabold text-[28px] text-white leading-none">
            ₹{(totalEMI / 1000).toFixed(0)}K
          </p>
          <p className="font-body text-[11px] text-white/40 mt-1.5">
            {activePlanCount} plans · {streak} streak
          </p>
        </div>
      </div>

      {/* B. Budget gauge */}
      <div className="bg-[#161616] rounded-xl p-4 border border-white/[0.07] mb-3.5 animate-fade-up d1">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display font-semibold text-[13px] text-white/70">Monthly Budget</p>
          <p className="font-body text-[11px] text-white/35">
            {budgetPct}% · 18 days left
          </p>
        </div>
        <div className="h-1 rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${Math.min(budgetPct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-body text-[11px] text-white/35">
            {formatINR(totalSpent)} spent
          </span>
          <span className="font-body text-[11px] text-white/35">
            {formatINR(totalBudget)} budget
          </span>
        </div>
      </div>

      {/* C. Next payment alert */}
      {nextDuePlan && (
        <div className="bg-warn-500/10 border border-warn-500/20 rounded-xl flex items-center gap-3 p-3.5 mb-3.5 animate-fade-up d2">
          <Calendar size={17} className="text-warn-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-[12px] text-white/80">
              Next: {formatINR(nextDuePlan.monthlyEMI)} due {nextDuePlan.nextDue}
            </p>
            <p className="font-body text-[11px] text-white/40">
              {nextDuePlan.product} EMI · 3 days
            </p>
          </div>
        </div>
      )}

      {/* D. Key insights */}
      <div className="mb-3.5 animate-fade-up d2">
        <p className="font-body text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2.5">Insights</p>
        <div className="bg-[#161616] rounded-xl border border-white/[0.07] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
            <TrendingUp size={14} className="text-ora-400 flex-shrink-0" />
            <span className="font-body text-[12px] text-white/70">
              Restaurants over budget by ₹{(overCats.find(c => c.id === "food")?.amount ?? 0) - (overCats.find(c => c.id === "food")?.budget ?? 0) > 0
                ? (((overCats.find(c => c.id === "food")?.amount ?? 0) - (overCats.find(c => c.id === "food")?.budget ?? 0)) / 1000).toFixed(1) + "K"
                : "3.5K"}
            </span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
            <AlertCircle size={14} className="text-warn-400 flex-shrink-0" />
            <span className="font-body text-[12px] text-white/70">
              {wasteCost > 0 ? `₹${(wasteCost / 1000).toFixed(1)}K` : "Some"} in unused subscriptions
            </span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <CheckCircle2 size={14} className="text-pri-400 flex-shrink-0" />
            <span className="font-body text-[12px] text-white/70">
              Credit score up +{USER.scoreChange} pts this month
            </span>
          </div>
        </div>
      </div>

      {/* E. Top categories */}
      <div className="mb-3.5 animate-fade-up d3">
        <div className="bg-[#161616] rounded-xl border border-white/[0.07] overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <p className="font-body text-[10px] font-semibold text-white/30 uppercase tracking-widest">Top Categories</p>
            <Link
              href="/spend"
              className="font-body text-[11px] text-pri-400 flex items-center gap-0.5"
            >
              See all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="px-4 pb-2">
            <HomeCatList />
          </div>
        </div>
      </div>

      {/* F. Active BNPL Plans */}
      <div className="mb-3.5 animate-fade-up d4">
        <div className="bg-[#161616] rounded-xl border border-white/[0.07] overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <p className="font-body text-[10px] font-semibold text-white/30 uppercase tracking-widest">Active Plans</p>
            <Link
              href="/bnpl"
              className="font-body text-[11px] text-pri-400 flex items-center gap-0.5"
            >
              Manage <ChevronRight size={12} />
            </Link>
          </div>
          <div className="px-4 pb-3">
            {PLANS.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-b-0"
              >
                <span className="text-lg leading-none">{p.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-medium text-[13px] text-white/85 truncate">
                    {p.product}
                  </p>
                  <p className="font-body text-[11px] text-white/35">
                    {p.tenure - p.paid} months left
                  </p>
                </div>
                <p className="font-display font-semibold text-[13px] text-white/80 flex-shrink-0">
                  {formatINR(p.monthlyEMI)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* G. AI CTA */}
      <Link
        href="/advisor"
        className="relative overflow-hidden bg-gradient-to-br from-pri-600 to-pri-800 rounded-xl flex items-center gap-3 p-4 text-white w-full animate-fade-up d4"
      >
        <BorderBeam size={100} duration={6} colorFrom="#34D399" colorTo="#818CF8" />
        <Sparkles size={18} className="flex-shrink-0 opacity-80" />
        <div className="flex-1">
          <p className="font-display font-semibold text-[14px]">Get AI advice</p>
          <p className="font-body text-[11px] text-white/60">Personalized tips</p>
        </div>
        <ChevronRight size={16} className="flex-shrink-0 text-white/50" />
      </Link>
    </div>
  );
}
