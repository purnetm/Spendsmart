import { totalSpent, totalBudget, overCats } from "@/lib/data/categories";
import { PLANS } from "@/lib/data/plans";
import { USER } from "@/lib/data/user";
import { wasteCost } from "@/lib/data/subscriptions";
import { formatINR } from "@/lib/utils/format";
import { HomeCatList } from "@/components/home/home-cat-list";
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
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-n-100">
          <p className="font-body text-[11px] text-n-400 mb-1">Spent this month</p>
          <p className="font-display font-extrabold text-[22px] text-n-900 leading-none">
            ₹{(totalSpent / 1000).toFixed(1)}K
          </p>
          <p className={`font-body text-[11px] mt-1 ${isOver ? "text-ora-600" : "text-pri-600"}`}>
            {isOver
              ? `Over by ₹${Math.abs(budgetDiff / 1000).toFixed(1)}K`
              : `Under by ₹${(budgetDiff / 1000).toFixed(1)}K`}
          </p>
        </div>

        {/* Active EMIs */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-n-100">
          <p className="font-body text-[11px] text-n-400 mb-1">Active EMIs</p>
          <p className="font-display font-extrabold text-[22px] text-n-900 leading-none">
            ₹{(totalEMI / 1000).toFixed(0)}K
          </p>
          <p className="font-body text-[11px] text-n-400 mt-1">
            {activePlanCount} plans · {streak} streak
          </p>
        </div>
      </div>

      {/* B. Budget gauge */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-n-100 mb-3.5 animate-fade-up d1">
        <div className="flex items-center justify-between mb-2.5">
          <p className="font-display font-semibold text-[13px] text-n-700">Monthly Budget</p>
          <p className="font-body text-[11px] text-n-400">
            {budgetPct}% · 18 days left
          </p>
        </div>
        <div className="h-2 rounded-full bg-n-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${Math.min(budgetPct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="font-body text-[10px] text-n-400">
            {formatINR(totalSpent)} spent
          </span>
          <span className="font-body text-[10px] text-n-400">
            {formatINR(totalBudget)} budget
          </span>
        </div>
      </div>

      {/* C. Next payment alert */}
      {nextDuePlan && (
        <div className="bg-warn-50 border border-warn-100 rounded-lg flex items-center gap-2.5 p-3 mb-3.5 animate-fade-up d2">
          <Calendar size={18} className="text-warn-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-[12px] text-n-800">
              Next: {formatINR(nextDuePlan.monthlyEMI)} due {nextDuePlan.nextDue}
            </p>
            <p className="font-body text-[11px] text-n-400">
              {nextDuePlan.product} EMI · 3 days
            </p>
          </div>
        </div>
      )}

      {/* D. Key insights */}
      <div className="mb-3.5 animate-fade-up d2">
        <p className="font-display font-semibold text-[13px] text-n-700 mb-2">Key Insights</p>
        <div className="flex flex-col gap-2">
          <div className="bg-white rounded-lg px-3 py-2.5 border border-n-100 flex items-center gap-2.5">
            <TrendingUp size={15} className="text-ora-500 flex-shrink-0" />
            <span className="font-body text-[12px] text-n-700">
              Restaurants over budget by ₹{(overCats.find(c => c.id === "food")?.amount ?? 0) - (overCats.find(c => c.id === "food")?.budget ?? 0) > 0
                ? (((overCats.find(c => c.id === "food")?.amount ?? 0) - (overCats.find(c => c.id === "food")?.budget ?? 0)) / 1000).toFixed(1) + "K"
                : "3.5K"}
            </span>
          </div>
          <div className="bg-white rounded-lg px-3 py-2.5 border border-n-100 flex items-center gap-2.5">
            <AlertCircle size={15} className="text-warn-500 flex-shrink-0" />
            <span className="font-body text-[12px] text-n-700">
              {wasteCost > 0 ? `₹${(wasteCost / 1000).toFixed(1)}K` : "Some"} in unused subscriptions
            </span>
          </div>
          <div className="bg-white rounded-lg px-3 py-2.5 border border-n-100 flex items-center gap-2.5">
            <CheckCircle2 size={15} className="text-pri-500 flex-shrink-0" />
            <span className="font-body text-[12px] text-n-700">
              Credit score up +{USER.scoreChange} pts this month
            </span>
          </div>
        </div>
      </div>

      {/* E. Top categories */}
      <div className="mb-3.5 animate-fade-up d3">
        <div className="bg-white rounded-xl shadow-sm border border-n-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <p className="font-display font-semibold text-[13px] text-n-700">Top Categories</p>
            <Link
              href="/spend"
              className="font-body text-[11px] text-pri-600 flex items-center gap-0.5"
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
        <div className="bg-white rounded-xl shadow-sm border border-n-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <p className="font-display font-semibold text-[13px] text-n-700">Active BNPL Plans</p>
            <Link
              href="/bnpl"
              className="font-body text-[11px] text-pri-600 flex items-center gap-0.5"
            >
              Manage <ChevronRight size={12} />
            </Link>
          </div>
          <div className="px-4 pb-3">
            {PLANS.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 py-2.5 border-b border-n-100 last:border-b-0"
              >
                <span className="text-xl leading-none">{p.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-medium text-[13px] text-n-800 truncate">
                    {p.product}
                  </p>
                  <p className="font-body text-[11px] text-n-400">
                    {p.tenure - p.paid} months left
                  </p>
                </div>
                <p className="font-display font-semibold text-[13px] text-n-800 flex-shrink-0">
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
        className="bg-gradient-to-br from-pri-600 to-pri-800 rounded-lg flex items-center gap-2.5 p-4 text-white w-full animate-fade-up d4"
      >
        <Sparkles size={20} className="flex-shrink-0" />
        <div className="flex-1">
          <p className="font-display font-semibold text-[14px]">Get AI advice</p>
          <p className="font-body text-[11px] text-white/70">Personalized tips</p>
        </div>
        <ChevronRight size={18} className="flex-shrink-0 text-white/70" />
      </Link>
    </div>
  );
}
