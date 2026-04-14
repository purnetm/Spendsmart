import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        pri: {
          50: "#ECFDF5", 100: "#D1FAE5", 200: "#A7F3D0", 300: "#6EE7B7",
          400: "#34D399", 500: "#10B981", 600: "#059669", 700: "#047857",
          800: "#065F46", 900: "#064E3B",
        },
        acc: {
          50: "#EEF2FF", 100: "#E0E7FF", 200: "#C7D2FE", 300: "#A5B4FC",
          400: "#818CF8", 500: "#6366F1", 600: "#4F46E5", 700: "#4338CA",
        },
        warn: {
          50: "#FFFBEB", 100: "#FEF3C7", 200: "#FDE68A", 300: "#FCD34D",
          400: "#FBBF24", 500: "#F59E0B", 600: "#D97706",
        },
        err: {
          50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA",
          400: "#F87171", 500: "#EF4444", 600: "#DC2626",
        },
        ora: {
          50: "#FFF7ED", 100: "#FFEDD5",
          400: "#FB923C", 500: "#F97316", 600: "#EA580C",
        },
        rose: {
          50: "#FFF1F2", 100: "#FFE4E6",
          400: "#FB7185", 500: "#F43F5E", 600: "#E11D48",
        },
        n: {
          0: "#FFFFFF", 50: "#F8FAFC", 100: "#F1F5F9", 200: "#E2E8F0",
          300: "#CBD5E1", 400: "#94A3B8", 500: "#64748B", 600: "#475569",
          700: "#334155", 800: "#1E293B", 900: "#0F172A",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        full: "9999px",
      },
      animation: {
        "fade-up": "fadeUp 0.45s cubic-bezier(.16,1,.3,1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(.16,1,.3,1) forwards",
        "slide-down": "slideDown 0.3s ease forwards",
        "score-pop": "scorePop 0.4s ease",
        typing: "typing 1.2s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "card-reveal": "cardReveal 0.4s cubic-bezier(.16,1,.3,1) forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.93)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideDown: {
          from: { maxHeight: "0", opacity: "0" },
          to: { maxHeight: "600px", opacity: "1" },
        },
        scorePop: {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        typing: {
          "0%, 80%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
        cardReveal: {
          from: { opacity: "0", transform: "scale(0.85) rotateY(8deg)" },
          to: { opacity: "1", transform: "scale(1) rotateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
