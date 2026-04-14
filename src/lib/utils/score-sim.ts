import type { ScorePoint, ScenarioType } from "@/types";

export function simScore(
  base: number,
  amount: number,
  tenure: number,
  scenario: ScenarioType
): ScorePoint[] {
  const pts: ScorePoint[] = [];
  let s = base - 5;

  pts.push({ month: "M0", score: s, event: "Credit inquiry", type: "neutral" });

  for (let i = 1; i <= tenure; i++) {
    if (scenario === "on-time") {
      s += Math.round(2 + Math.random() * 1.5);
      pts.push({ month: `M${i}`, score: Math.min(s, 900), event: "On time", type: "positive" });
    } else if (scenario === "early") {
      const cutoff = Math.ceil(tenure * 0.6);
      if (i <= cutoff) {
        s += Math.round(3 + Math.random() * 1.5);
        const isClosing = i === cutoff;
        if (isClosing) s += 5;
        pts.push({ month: `M${i}`, score: Math.min(s, 900), event: isClosing ? "Closed early! +5" : "On time", type: "positive" });
      } else {
        pts.push({ month: `M${i}`, score: Math.min(s, 900), event: "Plan closed", type: "neutral" });
      }
    } else if (scenario === "miss") {
      if (i === 3) {
        s -= Math.round(22 + Math.random() * 8);
        pts.push({ month: `M${i}`, score: Math.max(s, 300), event: "Missed! ~-25", type: "negative" });
      } else {
        s += Math.round(i > 3 && i <= 6 ? 1.5 : 2 + Math.random());
        pts.push({ month: `M${i}`, score: Math.min(s, 900), event: i < 3 ? "On time" : i <= 6 ? "Recovery" : "Rebuilding", type: i < 3 ? "positive" : "recovery" });
      }
    } else {
      // default scenario
      if (i <= 2) {
        s += 2;
        pts.push({ month: `M${i}`, score: s, event: "On time", type: "positive" });
      } else if (i === 3) {
        s -= 25;
        pts.push({ month: `M${i}`, score: Math.max(s, 300), event: "Missed", type: "negative" });
      } else if (i === 4) {
        s -= 35;
        pts.push({ month: `M${i}`, score: Math.max(s, 300), event: "2nd miss", type: "negative" });
      } else {
        s -= Math.round(5 + Math.random() * 3);
        pts.push({ month: `M${i}`, score: Math.max(s, 300), event: "Default", type: "negative" });
      }
    }
  }

  return pts;
}
