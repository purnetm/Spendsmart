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
}[] = [
  { key: "on-time", label: "On time",  Icon: CheckCircle2,  colorActive: "border-pri-500/40 bg-pri-500/10 text-pri-400" },
  { key: "early",   label: "Early",    Icon: Zap,           colorActive: "border-acc-500/40 bg-acc-500/10 text-acc-400" },
  { key: "miss",    label: "Miss 1",   Icon: AlertTriangle, colorActive: "border-warn-500/40 bg-warn-500/10 text-warn-400" },
  { key: "default", label: "Default",  Icon: X,             colorActive: "border-err-500/40 bg-err-500/10 text-err-400" },
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

  const finalScore  = simData[simData.length - 1]?.score ?? USER.creditScore;
  const scoreChange = finalScore - USER.creditScore;
  const isPositive  = scoreChange >= 0;

  const peers = PEER_INSIGHTS[tenure as 3 | 6 | 12] ?? PEER_INSIGHTS[6];

  return (
    <div>
      {/* Score comparison */}
      <div className="bg-[#161616] rounded-xl border border-white/[0.07] p-4 mb-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-[11px] text-white/35 mb-1 uppercase tracking-wider">Current</p>
            <p className="font-display font-extrabold text-[28px] text-white leading-none">
              {USER.creditScore}
            </p>
          </div>

          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isPositive ? "bg-pri-500/15" : "bg-err-500/15"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={16} className="text-pri-400" />
            ) : (
              <ArrowDownRight size={16} className="text-err-400" />
            )}
          </div>

          <div className="text-right">
            <p className="font-body text-[11px] text-white/35 mb-1 uppercase tracking-wider">Projected</p>
            <p
              className={`font-display font-extrabold text-[28px] leading-none ${
                isPositive ? "text-pri-400" : "text-err-400"
              }`}
            >
              {finalScore}
            </p>
            <p
              className={`font-body text-[11px] ${
                isPositive ? "text-pri-400" : "text-err-400"
              }`}
            >
              {isPositive ? "+" : ""}{scoreChange}
            </p>
          </div>
        </div>
      </div>

      {/* Amount + slider */}
      <div className="bg-[#161616] rounded-xl border border-white/[0.07] p-4 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[12px] text-white/50">
            ₹{amount.toLocaleString("en-IN")} over {tenure}mo
          </span>
          <span className="font-body text-[12px] text-white/35">
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
        <div className="flex gap-1.5 mt-3.5">
          {[3, 6, 12].map((t) => (
            <button
              key={t}
              onClick={() => setTenure(t)}
              className={`flex-1 rounded-lg border py-1.5 font-display text-[12px] font-semibold transition-colors ${
                tenure === t
                  ? "border-pri-500/40 bg-pri-500/10 text-pri-400"
                  : "border-white/[0.08] bg-transparent text-white/35"
              }`}
            >
              {t}mo
            </button>
          ))}
        </div>
      </div>

      {/* Scenario selector */}
      <div className="flex gap-1.5 mb-3.5">
        {SCENARIOS.map(({ key, label, Icon, colorActive }) => {
          const isActive = scenario === key;
          return (
            <button
              key={key}
              onClick={() => setScenario(key)}
              className={`flex-1 rounded-xl border py-2.5 flex flex-col items-center gap-1 transition-colors ${
                isActive ? colorActive : "border-white/[0.08] bg-transparent text-white/30"
              }`}
            >
              <Icon size={13} />
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
      <div className="bg-[#161616] rounded-xl border border-white/[0.07] p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <Brain size={14} className="text-acc-400" />
          <span className="font-display font-semibold text-[13px] text-white/70">
            Peer Insights
          </span>
        </div>
        <p className="font-body text-[11px] text-white/30 mb-3">
          How borrowers with similar profiles manage {tenure}-month plans
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "On time %",   value: peers.onTime },
            { label: "Avg score",   value: peers.avgScore },
            { label: "Defaulted %", value: peers.defaulted },
          ].map(({ label, value }) => (
            <div key={label} className="text-center rounded-lg bg-white/[0.05] p-2.5 border border-white/[0.06]">
              <p className="font-display font-bold text-[15px] text-white">{value}</p>
              <p className="font-body text-[10px] text-white/35">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
