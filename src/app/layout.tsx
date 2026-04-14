import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SpendSmart",
  description: "Track spending, manage BNPL plans, get AI insights — built for India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${dmSans.variable} bg-n-50`}>
        <div className="max-w-[430px] mx-auto min-h-screen shadow-[0_0_60px_rgba(0,0,0,0.08)] bg-n-50 font-body">
          {children}
        </div>
      </body>
    </html>
  );
}
