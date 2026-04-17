"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { MonthlyTrend } from "@/types";

interface TrendLineProps {
  data: MonthlyTrend[];
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "8px", padding: "8px 12px" }} className="text-[11px] text-white shadow-lg">
      <p className="font-display font-semibold mb-1" style={{ color: "rgba(255,255,255,0.40)" }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: ₹{(entry.value / 1000).toFixed(1)}K
        </p>
      ))}
    </div>
  );
}

export function TrendLine({ data }: TrendLineProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="m"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }}
          tickFormatter={(v) => `${v / 1000}K`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)" }} />
        <Line
          type="monotone"
          dataKey="spent"
          name="Spent"
          stroke="#34D399"
          strokeWidth={2.5}
          dot={{ fill: "#34D399", r: 4, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#34D399" }}
        />
        <Line
          type="monotone"
          dataKey="budget"
          name="Budget"
          stroke="#4F46E5"
          strokeWidth={2}
          strokeDasharray="4 4"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
