"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

interface SpendingPieProps {
  data: PieDataItem[];
  height?: number;
}

interface TooltipPayloadItem {
  name: string;
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
  const item = payload[0];
  return (
    <div className="bg-n-800 rounded-sm px-2.5 py-1.5 text-[11px] text-white">
      {item.name}: ₹{item.value.toLocaleString("en-IN")}
    </div>
  );
}

export function SpendingPie({ data, height = 180 }: SpendingPieProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={78}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
