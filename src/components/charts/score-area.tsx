"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Dot,
} from "recharts";
import type { ScorePoint } from "@/types";

interface ScoreAreaProps {
  data: ScorePoint[];
  baseScore: number;
  scoreChange: number;
}

const EVENT_COLORS: Record<ScorePoint["type"], string> = {
  positive: "#10B981",   // pri-500
  negative: "#EF4444",   // err-500
  recovery: "#F59E0B",   // warn-500
  neutral:  "#94A3B8",   // n-400
};

interface TooltipPayloadItem {
  payload: ScorePoint;
  value: number;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="bg-n-800 rounded-md px-3 py-2 text-[11px] text-white shadow-lg max-w-[160px]">
      <p className="font-display font-semibold text-n-300 mb-0.5">{point.month}</p>
      <p className="font-semibold text-[13px] mb-0.5">{point.score}</p>
      {point.event && (
        <p className="text-n-400 leading-tight">{point.event}</p>
      )}
    </div>
  );
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: ScorePoint;
}

function CustomDot({ cx, cy, payload }: CustomDotProps) {
  if (cx === undefined || cy === undefined || !payload) return null;
  const color = EVENT_COLORS[payload.type];
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={4}
      fill={color}
      stroke="white"
      strokeWidth={1.5}
    />
  );
}

export function ScoreArea({ data, baseScore, scoreChange }: ScoreAreaProps) {
  const isPositive = scoreChange >= 0;
  const gradientId = isPositive ? "scoreGradientPos" : "scoreGradientNeg";
  const gradientColor = isPositive ? "#34D399" : "#EF4444"; // pri-400 or err-400

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 8, right: 4, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.25} />
            <stop offset="95%" stopColor={gradientColor} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#94A3B8" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#94A3B8" }}
          domain={["dataMin - 15", "dataMax + 10"]}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={baseScore}
          stroke="#CBD5E1"
          strokeDasharray="4 4"
          strokeWidth={1.5}
        />
        <Area
          type="monotone"
          dataKey="score"
          stroke={gradientColor}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={<CustomDot />}
          activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
