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
        <div className="rounded-lg border border-n-100 bg-white p-3">
          <div className="flex items-center gap-1 mb-0.5">
            <Star size={14} className="text-warn-500 fill-warn-500" />
            <span className="font-body text-[11px] text-n-400">Credit score</span>
          </div>
          <p className="font-display font-bold text-lg text-n-900">
            {USER.creditScore}
          </p>
          <p className="font-body text-[10px] text-pri-600">
            +{USER.scoreChange} this month
          </p>
        </div>

        {/* On-time streak */}
        <div className="rounded-lg border border-pri-100 bg-pri-50 p-3">
          <div className="flex items-center gap-1 mb-0.5">
            <Award size={14} className="text-pri-600" />
            <span className="font-body text-[11px] text-n-400">Streak</span>
          </div>
          <p className="font-display font-bold text-lg text-n-900">
            {USER.onTimeStreak} streak
          </p>
          <p className="font-body text-[10px] text-pri-600">
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
      <div className="rounded-lg bg-gradient-to-br from-pri-50 to-acc-50 border border-pri-100 p-3.5 mt-2">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldCheck size={16} className="text-pri-600 flex-shrink-0" />
          <span className="font-display font-semibold text-[13px] text-n-700">
            Our commitment
          </span>
        </div>
        <p className="font-body text-[12px] text-n-500 leading-relaxed">
          All fees shown upfront. We&apos;ll never encourage borrowing more than you can repay.
        </p>
      </div>
    </div>
  );
}
