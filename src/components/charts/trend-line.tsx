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
    <div className="bg-n-800 rounded-md px-3 py-2 text-[11px] text-white shadow-lg">
      <p className="font-display font-semibold mb-1 text-n-300">{label}</p>
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
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis
          dataKey="m"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#94A3B8" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#94A3B8" }}
          tickFormatter={(v) => `${v / 1000}K`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="spent"
          name="Spent"
          stroke="#F97316"
          strokeWidth={2.5}
          dot={{ fill: "#F97316", r: 4, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="budget"
          name="Budget"
          stroke="#CBD5E1"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
