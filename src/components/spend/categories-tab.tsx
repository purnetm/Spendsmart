"use client";

import { SpendingPie } from "@/components/charts/spending-pie";
import { CatBar } from "@/components/shared/cat-bar";
import { CATS } from "@/lib/data/categories";

export function CategoriesTab() {
  return (
    <div>
      {/* Pie chart card */}
      <div className="rounded-xl border border-white/[0.07] bg-[#161616] p-3 mb-3.5">
        <p className="font-body text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
          Where your money goes
        </p>
        <SpendingPie
          data={CATS.map((c) => ({ name: c.label, value: c.amount, color: c.color }))}
          height={180}
        />
        {/* Legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 pb-2">
          {CATS.slice(0, 5).map((c) => (
            <div key={c.id} className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="font-body text-[10px] text-white/35">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category list card */}
      <div className="rounded-xl border border-white/[0.07] bg-[#161616] px-3.5 py-1">
        {CATS.map((c) => (
          <CatBar key={c.id} cat={c} />
        ))}
      </div>
    </div>
  );
}
