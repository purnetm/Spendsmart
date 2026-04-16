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
    ratio < 0.4 ? "text-pri-600 bg-pri-50 border-pri-200" : ratio < 0.6 ? "text-warn-700 bg-warn-50 border-warn-200" : "text-err-600 bg-err-50 border-err-200";

  const newEmiBarColor =
    ratio < 0.4 ? "bg-pri-400" : ratio < 0.6 ? "bg-warn-400" : "bg-err-400";

  const existingPct = Math.min((existingEMIs / income) * 100, 100);
  const newEmiPct = Math.min((emi / income) * 100, 100 - existingPct);
  const freePct = Math.max(100 - existingPct - newEmiPct, 0);

  return (
    <div>
      {/* Amount slider */}
      <div className="rounded-lg border border-n-100 bg-white p-3.5 mb-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-[12px] text-n-500">Amount</span>
          <span className="font-display font-bold text-xl text-pri-600">
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
        <div className="flex justify-between mt-1">
          <span className="font-body text-[10px] text-n-400">₹10K</span>
          <span className="font-body text-[10px] text-n-400">₹2L</span>
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
              className={`flex-1 rounded-md border p-2.5 text-center transition-colors ${
                isActive
                  ? "border-pri-400 bg-pri-50 text-pri-700"
                  : "border-n-200 bg-white text-n-600"
              }`}
              style={{ borderWidth: "1.5px" }}
            >
              <p className="font-display font-semibold text-[13px]">{t}mo</p>
              <p
                className={`font-body text-[10px] mt-0.5 ${
                  isActive ? "text-pri-500" : "text-n-400"
                }`}
              >
                ₹{emiForTenure.toLocaleString("en-IN")}/mo
              </p>
            </button>
          );
        })}
      </div>

      {/* Breakdown card */}
      <div className="bg-white rounded-lg border border-n-100 p-3.5 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[12px] text-n-500">Monthly EMI</span>
          <span className="font-display font-bold text-lg text-n-900">
            ₹{emi.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="space-y-2">
          {[
            { label: "Purchase price", value: `₹${amount.toLocaleString("en-IN")}` },
            { label: "Interest", value: `₹${totalInterest.toLocaleString("en-IN")}` },
            { label: "Total payable", value: `₹${totalPayable.toLocaleString("en-IN")}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="font-body text-[12px] text-n-500">{label}</span>
              <span className="font-display font-semibold text-[12px] text-n-800">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-3 p-2 bg-warn-50 rounded-md">
          <Info size={13} className="text-warn-600 flex-shrink-0" />
          <span className="font-body text-[11px] text-warn-700">
            {interestPct}% more than purchase price
          </span>
        </div>
      </div>

      {/* Affordability bar */}
      <div className="bg-white rounded-lg border border-n-100 p-3.5 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Scale size={14} className="text-n-500" />
            <span className="font-body text-[12px] text-n-600">Affordability</span>
          </div>
          <span
            className={`font-body text-[10px] font-medium px-2 py-0.5 rounded-full border ${affordabilityColor}`}
          >
            {affordabilityStatus}
          </span>
        </div>

        {/* Stacked bar */}
        <div className="h-3 rounded-full overflow-hidden flex mb-2">
          <div
            className="bg-acc-300 transition-all"
            style={{ width: `${existingPct}%` }}
          />
          <div
            className={`${newEmiBarColor} transition-all`}
            style={{ width: `${newEmiPct}%` }}
          />
          <div
            className="bg-pri-100 flex-1 transition-all"
            style={{ width: `${freePct}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] text-n-400">
            Income: ₹{(income / 1000).toFixed(0)}K
          </span>
          <span className="font-body text-[10px] text-n-400">
            Free: ₹{(free / 1000).toFixed(1)}K
          </span>
        </div>
      </div>

      {/* Qualify note */}
      <div className="flex items-center gap-2 bg-pri-50 rounded-md p-2.5">
        <CheckCircle2 size={15} className="text-pri-500 flex-shrink-0" />
        <span className="font-body text-[12px] text-pri-700">
          You qualify based on score of {USER.creditScore}
        </span>
      </div>
    </div>
  );
}
