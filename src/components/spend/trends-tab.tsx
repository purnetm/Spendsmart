"use client";

import { TrendLine } from "@/components/charts/trend-line";
import { MONTHLY_TREND } from "@/lib/data/trends";

export function TrendsTab() {
  return (
    <div className="rounded-lg border border-n-100 bg-white p-3.5">
      <p className="font-display font-semibold text-[13px] text-n-700 mb-3">
        Spending vs Budget (6 months)
      </p>
      <TrendLine data={MONTHLY_TREND} />
    </div>
  );
}
