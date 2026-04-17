"use client";

import { useState, useMemo } from "react";
import { Info, Scale, CheckCircle2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { USER } from "@/lib/data/user";

const TENURES = [3, 6, 12] as const;
type Tenure = (typeof TENURES)[number];

function calcEMI(amount: number, tenure: number): number {
  const r = 0.14 / 12;
  return Math.round((amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1));
}

export function CalculatorTab() {
  const [amount, setAmount] = useState(50000);
  const [tenure, setTenure] = useState<Tenure>(6);

  const emi = useMemo(() => calcEMI(amount, tenure), [amount, tenure]);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - amount;
  const interestPct = ((totalInterest / amount) * 100).toFixed(1);

  const income = USER.income;
  const existingEMIs = USER.existingEMIs;
  const totalEMIs = existingEMIs + emi;
  const free = income - totalEMIs;
  const ratio = totalEMIs / income;

  const affordabilityStatus =
    ratio < 0.4 ? "Comfortable" : ratio < 0.6 ? "Stretched" : "Risky";
  const affordabilityColor =
    ratio < 0.4
      ? "text-pri-400 bg-pri-500/10 border-pri-500/30"
      : ratio < 0.6
      ? "text-warn-400 bg-warn-500/10 border-warn-500/30"
      : "text-err-400 bg-err-500/10 border-err-500/30";

  const newEmiBarColor =
    ratio < 0.4 ? "bg-pri-500" : ratio < 0.6 ? "bg-warn-400" : "bg-err-400";

  const existingPct = Math.min((existingEMIs / income) * 100, 100);
  const newEmiPct = Math.min((emi / income) * 100, 100 - existingPct);
  const freePct = Math.max(100 - existingPct - newEmiPct, 0);

  return (
    <div>
      {/* Amount slider */}
      <div className="rounded-xl border border-white/[0.07] bg-[#161616] p-4 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[11px] text-white/35 uppercase tracking-wider">Amount</span>
          <span className="font-display font-bold text-xl text-pri-400">
            ₹{amount.toLocaleString("en-IN")}
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
          className="mb-1"
        />
        <div className="flex justify-between mt-2">
          <span className="font-body text-[10px] text-white/25">₹10K</span>
          <span className="font-body text-[10px] text-white/25">₹2L</span>
        </div>
      </div>

      {/* Tenure buttons */}
      <div className="flex gap-1.5 mb-3.5">
        {TENURES.map((t) => {
          const emiForTenure = calcEMI(amount, t);
          const isActive = tenure === t;
          return (
            <button
              key={t}
              onClick={() => setTenure(t)}
              className={`flex-1 rounded-xl border p-3 text-center transition-colors ${
                isActive
                  ? "border-pri-500/40 bg-pri-500/10 text-pri-400"
                  : "border-white/[0.08] bg-transparent text-white/40"
              }`}
            >
              <p className="font-display font-semibold text-[13px]">{t}mo</p>
              <p
                className={`font-body text-[10px] mt-0.5 ${
                  isActive ? "text-pri-400/70" : "text-white/25"
                }`}
              >
                ₹{emiForTenure.toLocaleString("en-IN")}/mo
              </p>
            </button>
          );
        })}
      </div>

      {/* Breakdown card */}
      <div className="bg-[#161616] rounded-xl border border-white/[0.07] p-4 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[11px] text-white/35 uppercase tracking-wider">Monthly EMI</span>
          <span className="font-display font-bold text-lg text-white">
            ₹{emi.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="space-y-2.5">
          {[
            { label: "Purchase price", value: `₹${amount.toLocaleString("en-IN")}` },
            { label: "Interest", value: `₹${totalInterest.toLocaleString("en-IN")}` },
            { label: "Total payable", value: `₹${totalPayable.toLocaleString("en-IN")}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="font-body text-[12px] text-white/40">{label}</span>
              <span className="font-display font-semibold text-[12px] text-white/75">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-3.5 p-2.5 bg-warn-500/10 rounded-lg border border-warn-500/15">
          <Info size={13} className="text-warn-400 flex-shrink-0" />
          <span className="font-body text-[11px] text-warn-400">
            {interestPct}% more than purchase price
          </span>
        </div>
      </div>

      {/* Affordability bar */}
      <div className="bg-[#161616] rounded-xl border border-white/[0.07] p-4 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Scale size={14} className="text-white/35" />
            <span className="font-body text-[12px] text-white/50">Affordability</span>
          </div>
          <span
            className={`font-body text-[10px] font-medium px-2 py-0.5 rounded-full border ${affordabilityColor}`}
          >
            {affordabilityStatus}
          </span>
        </div>

        {/* Stacked bar */}
        <div className="h-2 rounded-full overflow-hidden flex mb-2.5">
          <div
            className="bg-acc-400/60 transition-all"
            style={{ width: `${existingPct}%` }}
          />
          <div
            className={`${newEmiBarColor} transition-all`}
            style={{ width: `${newEmiPct}%` }}
          />
          <div
            className="bg-white/[0.06] flex-1 transition-all"
            style={{ width: `${freePct}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] text-white/30">
            Income: ₹{(income / 1000).toFixed(0)}K
          </span>
          <span className="font-body text-[10px] text-white/30">
            Free: ₹{(free / 1000).toFixed(1)}K
          </span>
        </div>
      </div>

      {/* Qualify note */}
      <div className="flex items-center gap-2 bg-pri-500/10 rounded-xl border border-pri-500/20 p-3">
        <CheckCircle2 size={15} className="text-pri-400 flex-shrink-0" />
        <span className="font-body text-[12px] text-pri-400">
          You qualify based on score of {USER.creditScore}
        </span>
      </div>
    </div>
  );
}
