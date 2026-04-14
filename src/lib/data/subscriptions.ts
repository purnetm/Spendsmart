import { Film, Music, Cloud, Dumbbell, Newspaper, Shield, Gamepad2 } from "lucide-react";
import type { Subscription } from "@/types";

export const SUBS: Subscription[] = [
  { id: 1, name: "Netflix",   icon: Film,     color: "#E50914", cost: 649,  used: 2,    unit: "hrs",    perUse: 325  },
  { id: 2, name: "Spotify",   icon: Music,    color: "#1DB954", cost: 119,  used: 22,   unit: "hrs",    perUse: 5    },
  { id: 3, name: "iCloud",    icon: Cloud,    color: "#007AFF", cost: 75,   used: null, unit: "on",     perUse: null },
  { id: 4, name: "Cult.fit",  icon: Dumbbell, color: "#FF6B35", cost: 1499, used: 8,    unit: "visits", perUse: 187  },
  { id: 5, name: "The Ken",   icon: Newspaper,color: "#1A1A2E", cost: 499,  used: 3,    unit: "reads",  perUse: 166  },
  { id: 6, name: "NordVPN",   icon: Shield,   color: "#4687FF", cost: 359,  used: null, unit: "on",     perUse: null },
  { id: 7, name: "Xbox Pass", icon: Gamepad2, color: "#107C10", cost: 449,  used: 0,    unit: "hrs",    perUse: null },
  { id: 8, name: "YouTube",   icon: Film,     color: "#FF0000", cost: 129,  used: 18,   unit: "hrs",    perUse: 7    },
];

export const subTotal  = SUBS.reduce((s, x) => s + x.cost, 0);
export const wasteSubs = SUBS.filter(s => s.used === 0 || (s.perUse !== null && s.perUse > 150));
export const wasteCost = wasteSubs.reduce((s, x) => s + x.cost, 0);
