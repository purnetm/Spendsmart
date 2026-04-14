import { Utensils, ShoppingBag, Home as HomeIcon, Car, Wifi, Dumbbell, Film, Coffee } from "lucide-react";
import type { Category } from "@/types";

export const CATS: Category[] = [
  { id: "food",          label: "Restaurants",   icon: Utensils,   color: "#F97316", amount: 18500, budget: 15000, prev: 16000 },
  { id: "shopping",      label: "Shopping",       icon: ShoppingBag,color: "#A855F7", amount: 12400, budget: 12000, prev: 14200 },
  { id: "rent",          label: "Rent",           icon: HomeIcon,   color: "#3B82F6", amount: 25000, budget: 25000, prev: 25000 },
  { id: "transport",     label: "Transport",      icon: Car,        color: "#22C55E", amount: 4200,  budget: 5000,  prev: 4800  },
  { id: "subs",          label: "Subscriptions",  icon: Wifi,       color: "#EC4899", amount: 3200,  budget: 2500,  prev: 2800  },
  { id: "fitness",       label: "Fitness",        icon: Dumbbell,   color: "#14B8A6", amount: 2500,  budget: 3000,  prev: 2500  },
  { id: "entertainment", label: "Entertainment",  icon: Film,       color: "#F43F5E", amount: 5600,  budget: 5000,  prev: 6200  },
  { id: "coffee",        label: "Coffee",         icon: Coffee,     color: "#92400E", amount: 3800,  budget: 3000,  prev: 3400  },
];

export const totalSpent    = CATS.reduce((s, c) => s + c.amount, 0);
export const totalBudget   = CATS.reduce((s, c) => s + c.budget, 0);
export const overCats      = CATS.filter(c => c.amount > c.budget);
export const savingsPotential = overCats.reduce((s, c) => s + (c.amount - c.budget), 0);
