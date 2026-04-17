"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Category } from "@/types";
import { formatINR } from "@/lib/utils/format";

interface CatBarProps {
  cat: Category;
}

export function CatBar({ cat }: CatBarProps) {
  const Icon = cat.icon;
  const isOver = cat.amount > cat.budget;
  const isNear = !isOver && cat.amount / cat.budget > 0.8;
  const fillPct = Math.min((cat.amount / cat.budget) * 100, 100);
  const diff = cat.amount - cat.prev;
  const isUp = diff > 0;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-n-100">
      {/* Icon container */}
      <div
        className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${cat.color}12` }}
      >
        <Icon size={15} color={cat.color} />
      </div>

      {/* Label + progress */}
      <div className="flex-1 min-w-0">
        {/* Top row */}
        <div className="flex items-center justify-between mb-1">
          <span className="font-display font-medium text-[13px] text-n-700 truncate">
            {cat.label}
          </span>
          <span
            className={`font-display font-semibold text-[13px] ml-2 flex-shrink-0 ${
              isOver ? "text-ora-600" : "text-n-800"
            }`}
          >
            {formatINR(cat.amount)}
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center gap-1.5">
          {/* Progress bar */}
          <div className="flex-1 h-1 bg-n-100 rounded overflow-hidden">
            <div
              className={`h-full rounded transition-all ${
                isOver
                  ? "bg-ora-400"
                  : isNear
                  ? "bg-warn-400"
                  : "bg-pri-400"
              }`}
              style={{ width: `${fillPct}%` }}
            />
          </div>

          {/* Budget text */}
          <span className="font-body text-[10px] text-n-400 flex-shrink-0">
            /{(cat.budget / 1000).toFixed(0)}K
          </span>

          {/* MoM arrow */}
          <span
            className={`flex items-center text-[11px] flex-shrink-0 ${
              isUp ? "text-err-500" : "text-pri-500"
            }`}
          >
            {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            ₹{Math.abs(diff / 1000).toFixed(1)}K
          </span>
        </div>
      </div>
    </div>
  );
}
