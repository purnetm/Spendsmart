import type { Plan } from "@/types";

export const PLANS: Plan[] = [
  {
    id: 1, product: "MacBook Air M3", merchant: "Croma", emoji: "💻",
    principal: 89999, tenure: 12, monthlyEMI: 8100, apr: 14.5, totalInterest: 7201,
    paid: 5, nextDue: "Apr 28", status: "on-track",
    payments: [
      { m: "Nov", ok: true }, { m: "Dec", ok: true }, { m: "Jan", ok: true },
      { m: "Feb", ok: true }, { m: "Mar", ok: true },
    ],
  },
  {
    id: 2, product: "iPhone 16 Pro", merchant: "Apple", emoji: "📱",
    principal: 134900, tenure: 6, monthlyEMI: 23800, apr: 12.0, totalInterest: 7900,
    paid: 3, nextDue: "Apr 15", status: "on-track",
    payments: [
      { m: "Jan", ok: true }, { m: "Feb", ok: true }, { m: "Mar", ok: false },
    ],
  },
  {
    id: 3, product: "Study Desk", merchant: "Urban Ladder", emoji: "🪑",
    principal: 28500, tenure: 3, monthlyEMI: 9750, apr: 10.0, totalInterest: 750,
    paid: 2, nextDue: "Apr 20", status: "almost-done",
    payments: [
      { m: "Feb", ok: true }, { m: "Mar", ok: true },
    ],
  },
];
