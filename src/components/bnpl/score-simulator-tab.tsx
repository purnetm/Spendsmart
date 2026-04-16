"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, ArrowDownRight, CheckCircle2, Zap, AlertTriangle, X, Brain } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ScoreArea } from "@/components/charts/score-area";
import { USER } from "@/lib/data/user";
import { simScore } from "@/lib/utils/score-sim";
import type { ScenarioType } from "@/types";

function calcEMI(amount: number, tenure: number): number {
  const r = 0.14 / 12;
  return Math.round((amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1));
}

const SCENARIOS: {
  key: ScenarioType;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  colorActive: string;
  colorBg: string;
}[] = [
  { key: "on-time", label: "On time", Icon: CheckCircle2, colorActive: "border-pri-400 bg-pri-50 text-pri-700", colorBg: "" },
  { key: "early",   label: "Early",   Icon: Zap,          colorActive: "border-acc-400 bg-acc-50 text-acc-700", colorBg: "" },
  { key: "miss",    label: "Miss 1",  Icon: AlertTriangle, colorActive: "border-warn-400 bg-warn-50 text-warn-700", colorBg: "" },
  { key: "default", label: "Default", Icon: X,            colorActive: "border-err-400 bg-err-50 text-err-700", colorBg: "" },
];

const PEER_INSIGHTS: Record<number, { onTime: string; avgScore: string; defaulted: string }> = {
  3:  { onTime: "96%", avgScore: "738", defaulted: "0.8%" },
  6:  { onTime: "91%", avgScore: "722", defaulted: "1.9%" },
  12: { onTime: "84%", avgScore: "708", defaulted: "3.4%" },
};

export function ScoreSimulatorTab() {
  const [amount, setAmount]     = useState(50000);
  const [tenure, setTenure]     = useState(6);
  const [scenario, setScenario] = useState<ScenarioType>("on-time");

  const emi = useMemo(() => calcEMI(amount, tenure), [amount, tenure]);

  const simData = useMemo(
    () => simScore(USER.creditScore, amount, tenure, scenario),
    [amount, tenure, scenario]
  );

  const finalScore   = simData[simData.length - 1]?.score ?? USER.creditScore;
  const scoreChange  = finalScore - USER.creditScore;
  const isPositive   = scoreChange >= 0;

  const peers = PEER_INSIGHTS[tenure as 3 | 6 | 12] ?? PEER_INSIGHTS[6];

  return (
    <div>
      {/* Score comparison */}
      <div className="bg-white rounded-lg border border-n-100 p-3.5 mb-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-[11px] text-n-400 mb-0.5">Current</p>
            <p className="font-display font-extrabold text-[28px] text-n-900 leading-none">
              {USER.creditScore}
            </p>
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isPositive ? "bg-pri-100" : "bg-err-100"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={16} className="text-pri-600" />
            ) : (
              <ArrowDownRight size={16} className="text-err-600" />
            )}
          </div>

          <div className="text-right">
            <p className="font-body text-[11px] text-n-400 mb-0.5">Projected</p>
            <p
              className={`font-display font-extrabold text-[28px] leading-none ${
                isPositive ? "text-pri-600" : "text-err-600"
              }`}
            >
              {finalScore}
            </p>
            <p
              className={`font-body text-[11px] ${
                isPositive ? "text-pri-600" : "text-err-600"
              }`}
            >
              {isPositive ? "+" : ""}{scoreChange}
            </p>
          </div>
        </div>
      </div>

      {/* Amount + slider */}
      <div className="bg-white rounded-lg border border-n-100 p-3.5 mb-3.5">
        <div className="flex items-center justify-between mb-1">
          <span className="font-body text-[12px] text-n-600">
            ₹{amount.toLocaleString("en-IN")} over {tenure}mo
          </span>
          <span className="font-body text-[12px] text-n-500">
            EMI ₹{emi.toLocaleString("en-IN")}
          </span>
        </div>
        <Slider
          min={10000}
          max={200000}
          step={5000}
          value={[amount]}
          onValueChange={(v) => {
            const val = Array.isArray(v) ? v[0] : v;
            if (typeof val === "number") setAmount(val);
          }}
        />
        {/* Tenure quick select */}
        <div className="flex gap-1.5 mt-3">
          {[3, 6, 12].map((t) => (
            <button
              key={t}
              onClick={() => setTenure(t)}
              className={`flex-1 rounded-md border py-1.5 font-display text-[12px] font-semibold transition-colors ${
                tenure === t
                  ? "border-pri-400 bg-pri-50 text-pri-700"
                  : "border-n-200 bg-white text-n-500"
              }`}
            >
              {t}mo
            </button>
          ))}
        </div>
      </div>

      {/* Scenario selector */}
      <div className="flex gap-1 mb-3.5">
        {SCENARIOS.map(({ key, label, Icon, colorActive }) => {
          const isActive = scenario === key;
          return (
            <button
              key={key}
              onClick={() => setScenario(key)}
              className={`flex-1 rounded-md border py-2 flex flex-col items-center gap-0.5 transition-colors ${
                isActive ? colorActive : "border-n-200 bg-white text-n-500"
              }`}
            >
              <Icon size={13} className={isActive ? "current-color" : ""} />
              <span className="font-body text-[10px]">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Score chart */}
      <div className="mb-3.5">
        <ScoreArea data={simData} baseScore={USER.creditScore} scoreChange={scoreChange} />
      </div>

      {/* Peer insights */}
      <div className="bg-white rounded-lg border border-n-100 p-3.5">
        <div className="flex items-center gap-1.5 mb-1">
          <Brain size={14} className="text-acc-500" />
          <span className="font-display font-semibold text-[13px] text-n-700">
            Peer Insights
          </span>
        </div>
        <p className="font-body text-[11px] text-n-400 mb-3">
          How borrowers with similar profiles manage {tenure}-month plans
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "On time %",   value: peers.onTime },
            { label: "Avg score",   value: peers.avgScore },
            { label: "Defaulted %", value: peers.defaulted },
          ].map(({ label, value }) => (
            <div key={label} className="text-center rounded-md bg-n-50 p-2">
              <p className="font-display font-bold text-[15px] text-n-900">{value}</p>
              <p className="font-body text-[10px] text-n-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
