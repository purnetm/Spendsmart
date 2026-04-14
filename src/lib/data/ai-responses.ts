import type { AIResponse } from "@/types";
import { totalSpent, totalBudget } from "./categories";
import { SUBS, wasteCost } from "./subscriptions";
import { USER } from "./user";

export const AI_INIT = `Hi ${USER.name}! 👋 Here's your April snapshot:\n\nYou've spent **₹${totalSpent.toLocaleString()}** this month — **₹${(totalSpent - totalBudget).toLocaleString()}** over budget.\n\nTop overspends: **Restaurants** (₹3,500 over) and **Subscriptions** (₹700 over). Plus you have **₹${wasteCost}/mo** in barely-used subscriptions.\n\nWhat should we tackle?`;

export const AI_MAP: Record<string, AIResponse> = {
  "Analyze restaurants": {
    text: `Restaurant spending: **₹18,500** (budget: ₹15,000)\n\nUp 15.6% from last month. Swiggy/Zomato orders ~60% (₹11,100), dine-out ~40% (₹7,400).\n\n**Quick wins:**\n• Cook 2 more meals/week → save ₹3,000-4,000/mo\n• Switch some delivery to meal prep → ~₹200/meal saved\n\nSet a weekly restaurant alert?`,
    actions: ["Set alert", "Show savings plan", "Skip"],
  },
  "Review subscriptions": {
    text: `You pay **₹${SUBS.reduce((s, x) => s + x.cost, 0).toLocaleString()}/mo** across ${SUBS.length} subscriptions.\n\n**Low-use alerts:**\n📺 Netflix — ₹649 but only 2 hrs used (₹325/hr!)\n💪 Cult.fit — ₹1,499 for 8 visits (₹187/visit)\n🎮 Xbox Pass — ₹449 with ZERO usage\n📰 The Ken — ₹499 for 3 articles (₹166/article)\n\nCancelling low-use subs saves **₹${wasteCost}/mo** (₹${(wasteCost * 12).toLocaleString()}/yr)`,
    actions: ["Cancel suggestions", "Keep all", "Go to Subscriptions"],
  },
  "Check BNPL health": {
    text: `Your BNPL overview:\n\n**3 active plans** totaling ₹41,650/mo in EMIs\n**Credit score:** ${USER.creditScore} (+${USER.scoreChange} this month)\n**Next payment:** ₹23,800 for iPhone 16 Pro — due Apr 15 (3 days!)\n\nYour EMI-to-income ratio is ${((USER.existingEMIs / USER.income) * 100).toFixed(0)}% — that's healthy. On-time payments are boosting your score nicely.`,
    actions: ["Simulate new purchase", "Early pay options", "Show rewards"],
  },
};

export const AI_DEFAULT: AIResponse = {
  text: "Based on your patterns, I'd suggest focusing on weekend dining (your biggest overshoot area) and reviewing that Xbox Game Pass subscription you haven't touched. Small daily changes add up. Want a personalized plan?",
  actions: ["Yes, create plan", "Show my trends"],
};
