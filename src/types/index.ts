export interface User {
  name: string;
  creditScore: number;
  scoreChange: number;
  creditLimit: number;
  creditUsed: number;
  onTimeStreak: number;
  savedViaGoodBehavior: number;
  income: number;
  existingEMIs: number;
}

export interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  amount: number;
  budget: number;
  prev: number;
}

export interface Payment {
  m: string;
  ok: boolean;
}

export type PlanStatus = "on-track" | "almost-done" | "overdue";

export interface Plan {
  id: number;
  product: string;
  merchant: string;
  emoji: string;
  principal: number;
  tenure: number;
  monthlyEMI: number;
  apr: number;
  totalInterest: number;
  paid: number;
  nextDue: string;
  status: PlanStatus;
  payments: Payment[];
}

export interface Subscription {
  id: number;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  cost: number;
  used: number | null;
  unit: string;
  perUse: number | null;
}

export interface MonthlyTrend {
  m: string;
  spent: number;
  budget: number;
}

export type MessageRole = "ai" | "user";

export interface Message {
  id: number;
  role: MessageRole;
  text: string;
  actions?: string[];
  onAction?: (action: string) => void;
}

export interface AIResponse {
  text: string;
  actions: string[];
}

export type ScenarioType = "on-time" | "early" | "miss" | "default";

export interface ScorePoint {
  month: string;
  score: number;
  event: string;
  type: "positive" | "negative" | "neutral" | "recovery";
}
