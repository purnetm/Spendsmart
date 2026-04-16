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
        <div className="rounded-lg border border-n-100 bg-white p-3">
          <p className="font-body text-[11px] text-n-400 mb-0.5">Monthly total</p>
          <p className="font-display font-extrabold text-xl text-n-900">
            ₹{subTotal}
          </p>
        </div>
        <div
          className={`rounded-lg border p-3 ${
            wasteCost > 0
              ? "bg-ora-50 border-ora-100"
              : "bg-pri-50 border-pri-100"
          }`}
        >
          <p className="font-body text-[11px] text-n-400 mb-0.5">Can save</p>
          <p className="font-display font-extrabold text-xl text-n-900">
            ₹{wasteCost}/mo
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-1 mb-2.5">
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
                ? "border-pri-400 bg-pri-50 text-pri-700"
                : "border-n-200 bg-white text-n-600"
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
              className="flex items-center gap-2.5 p-3 bg-white rounded-md border border-n-100 mb-1.5 animate-fade-up"
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${sub.color}12` }}
              >
                <Icon size={18} color={sub.color} />
              </div>

              {/* Name + usage */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-display font-semibold text-[13px] text-n-800 truncate">
                    {sub.name}
                  </span>
                  {waste && (
                    <span className="rounded-full bg-ora-50 border border-ora-100 text-ora-600 text-[9px] font-body px-1.5 py-0.5 flex-shrink-0">
                      Low use
                    </span>
                  )}
                </div>
                <p className="font-body text-[10px] text-n-400">
                  {getUsageText(sub)}
                </p>
              </div>

              {/* Cost */}
              <span className="font-display font-bold text-sm text-n-800 ml-auto flex-shrink-0">
                ₹{sub.cost}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
