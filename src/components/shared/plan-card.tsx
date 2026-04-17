"use client";

import { CheckCircle2, AlertTriangle, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Plan } from "@/types";
import { formatINR } from "@/lib/utils/format";

interface PlanCardProps {
  plan: Plan;
  expanded: boolean;
  onToggle: () => void;
}

const CIRCUMFERENCE = 100.5;

export function PlanCard({ plan, expanded, onToggle }: PlanCardProps) {
  const pct = Math.round((plan.paid / plan.tenure) * 100);
  const remaining = plan.tenure - plan.paid;
  const hasMissed = plan.payments.some((p) => !p.ok);
  const strokeColor = hasMissed ? "#FBBF24" : "#10B981";
  const dashOffset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden mb-2 transition-all duration-300 bg-[#1C1C1C]",
        expanded ? "border-pri-500/30" : "border-white/[0.07]"
      )}
    >
      {/* Header button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        {/* Emoji */}
        <div className="w-10 h-10 rounded-lg bg-pri-500/10 flex items-center justify-center flex-shrink-0 text-xl">
          {plan.emoji}
        </div>

        {/* Name + EMI info */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-sm text-white/85 truncate">
            {plan.product}
          </p>
          <p className="font-body text-[11px] text-white/40">
            {formatINR(plan.monthlyEMI)}/mo · {remaining} left
          </p>
        </div>

        {/* Circular SVG progress */}
        <div className="w-10 h-10 flex-shrink-0 relative flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <span
            className="absolute font-display text-[9px] font-semibold text-white/70"
            style={{ transform: "none" }}
          >
            {pct}%
          </span>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={16}
          className={cn(
            "text-white/30 flex-shrink-0 transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="animate-slide-down px-4 pb-4">
          {/* Full-width progress bar */}
          <div className="h-px w-full bg-white/[0.06] mb-4" />

          {/* 4-col stats grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: "Principal", value: formatINR(plan.principal) },
              { label: "Interest", value: formatINR(plan.totalInterest) },
              { label: "APR", value: `${plan.apr}%` },
              {
                label: "Total",
                value: formatINR(plan.principal + plan.totalInterest),
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-body text-[10px] text-white/30 mb-0.5">
                  {stat.label}
                </p>
                <p className="font-display font-semibold text-[11px] text-white/75">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Payments */}
          <p className="font-body text-[10px] text-white/30 mb-1.5">Payments</p>
          <div className="flex gap-1 flex-wrap mb-4">
            {plan.payments.map((payment, i) => (
              <div
                key={i}
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  payment.ok ? "bg-pri-500/15" : "bg-warn-500/15"
                )}
                title={payment.m}
              >
                {payment.ok ? (
                  <CheckCircle2 size={12} className="text-pri-400" />
                ) : (
                  <AlertTriangle size={12} className="text-warn-400" />
                )}
              </div>
            ))}
            {Array.from({ length: remaining }).map((_, i) => (
              <div
                key={`rem-${i}`}
                className="w-6 h-6 rounded-full bg-white/[0.06]"
              />
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <span className="font-body text-[11px] text-pri-400 bg-pri-500/10 border border-pri-500/20 rounded-full px-2.5 py-1">
              +2 pts/on-time payment
            </span>
            <button className="flex items-center gap-1 font-body text-[11px] font-medium text-pri-400 bg-pri-500/10 border border-pri-500/20 rounded-full px-3 py-1.5">
              <Zap size={11} className="text-pri-400" />
              Pay early
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
