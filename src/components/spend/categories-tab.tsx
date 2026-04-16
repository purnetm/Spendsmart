"use client";

import { SpendingPie } from "@/components/charts/spending-pie";
import { CatBar } from "@/components/shared/cat-bar";
import { CATS } from "@/lib/data/categories";

export function CategoriesTab() {
  return (
    <div>
      {/* Pie chart card */}
      <div className="rounded-lg border border-n-100 bg-white p-3 mb-3.5">
        <p className="font-display font-semibold text-[13px] text-n-700 mb-1">
          Where your money goes
        </p>
        <SpendingPie
          data={CATS.map((c) => ({ name: c.label, value: c.amount, color: c.color }))}
          height={180}
        />
        {/* Legend */}
        <div className="flex flex-wrap gap-1 pb-2">
          {CATS.slice(0, 5).map((c) => (
            <div key={c.id} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="font-body text-[10px] text-n-500">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category list card */}
      <div className="rounded-lg border border-n-100 bg-white px-3.5 py-2.5">
        {CATS.map((c) => (
          <CatBar key={c.id} cat={c} />
        ))}
      </div>
    </div>
  );
}
