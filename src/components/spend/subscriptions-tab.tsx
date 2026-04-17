"use client";

import { useState } from "react";
import { SUBS, subTotal, wasteCost } from "@/lib/data/subscriptions";
import type { Subscription } from "@/types";

function isWaste(sub: Subscription): boolean {
  return sub.used === 0 || (sub.perUse !== null && sub.perUse > 150);
}

function getUsageText(sub: Subscription): string {
  if (sub.unit === "on") return "Always on";
  if (sub.used === 0) return "Not used this month";
  return `${sub.used} ${sub.unit}/mo · ₹${sub.perUse}/use`;
}

type FilterType = "all" | "low";

export function SubscriptionsTab() {
  const [filter, setFilter] = useState<FilterType>("all");

  const wasteSubs = SUBS.filter(isWaste);
  const filtered = filter === "all" ? SUBS : wasteSubs;

  return (
    <div>
      {/* Summary row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-xl border border-white/[0.07] bg-[#161616] p-4">
          <p className="font-body text-[11px] text-white/35 mb-1.5 uppercase tracking-wider">Monthly total</p>
          <p className="font-display font-extrabold text-[22px] text-white leading-none">
            ₹{subTotal}
          </p>
        </div>
        <div
          className={`rounded-xl border p-4 ${
            wasteCost > 0
              ? "bg-ora-500/10 border-ora-500/20"
              : "bg-pri-500/10 border-pri-500/20"
          }`}
        >
          <p className="font-body text-[11px] text-white/35 mb-1.5 uppercase tracking-wider">Can save</p>
          <p className="font-display font-extrabold text-[22px] text-white leading-none">
            ₹{wasteCost}/mo
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 mb-3">
        {(
          [
            { key: "all" as FilterType, label: `All (${SUBS.length})` },
            { key: "low" as FilterType, label: `Low use (${wasteSubs.length})` },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full border text-[11px] font-body px-3 py-1.5 transition-colors ${
              filter === key
                ? "border-pri-500/40 bg-pri-500/10 text-pri-400"
                : "border-white/[0.10] bg-transparent text-white/40"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Subscription rows */}
      <div>
        {filtered.map((sub) => {
          const Icon = sub.icon;
          const waste = isWaste(sub);
          return (
            <div
              key={sub.id}
              className="flex items-center gap-3 p-3.5 bg-[#161616] rounded-xl border border-white/[0.07] mb-1.5 animate-fade-up"
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${sub.color}20` }}
              >
                <Icon size={18} color={sub.color} />
              </div>

              {/* Name + usage */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-display font-semibold text-[13px] text-white/85 truncate">
                    {sub.name}
                  </span>
                  {waste && (
                    <span className="rounded-full bg-ora-500/10 border border-ora-500/20 text-ora-400 text-[9px] font-body px-1.5 py-0.5 flex-shrink-0">
                      Low use
                    </span>
                  )}
                </div>
                <p className="font-body text-[10px] text-white/35">
                  {getUsageText(sub)}
                </p>
              </div>

              {/* Cost */}
              <span className="font-display font-bold text-sm text-white/80 ml-auto flex-shrink-0">
                ₹{sub.cost}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
