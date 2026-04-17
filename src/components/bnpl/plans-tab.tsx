"use client";

import { useState } from "react";
import { Star, Award, ShieldCheck } from "lucide-react";
import { PlanCard } from "@/components/shared/plan-card";
import { PLANS } from "@/lib/data/plans";
import { USER } from "@/lib/data/user";
import { formatINR } from "@/lib/utils/format";

export function PlansTab() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2 mb-3.5">
        {/* Credit score */}
        <div className="rounded-xl border border-white/[0.07] bg-[#161616] p-4">
          <div className="flex items-center gap-1 mb-1.5">
            <Star size={13} className="text-warn-400 fill-warn-400" />
            <span className="font-body text-[11px] text-white/35 uppercase tracking-wider">Score</span>
          </div>
          <p className="font-display font-bold text-[22px] text-white leading-none">
            {USER.creditScore}
          </p>
          <p className="font-body text-[10px] text-pri-400 mt-1">
            +{USER.scoreChange} this month
          </p>
        </div>

        {/* On-time streak */}
        <div className="rounded-xl border border-pri-500/20 bg-pri-500/10 p-4">
          <div className="flex items-center gap-1 mb-1.5">
            <Award size={13} className="text-pri-400" />
            <span className="font-body text-[11px] text-white/35 uppercase tracking-wider">Streak</span>
          </div>
          <p className="font-display font-bold text-[22px] text-white leading-none">
            {USER.onTimeStreak}
          </p>
          <p className="font-body text-[10px] text-pri-400 mt-1">
            Saved {formatINR(USER.savedViaGoodBehavior)}
          </p>
        </div>
      </div>

      {/* Plan cards */}
      <div className="mb-2">
        {PLANS.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            expanded={expandedId === p.id}
            onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
          />
        ))}
      </div>

      {/* Ethical commitment banner */}
      <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-4 mt-2">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldCheck size={15} className="text-pri-400 flex-shrink-0" />
          <span className="font-display font-semibold text-[13px] text-white/70">
            Our commitment
          </span>
        </div>
        <p className="font-body text-[12px] text-white/35 leading-relaxed">
          All fees shown upfront. We&apos;ll never encourage borrowing more than you can repay.
        </p>
      </div>
    </div>
  );
}
