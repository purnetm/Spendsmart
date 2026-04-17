import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

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
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body className="bg-[#09090b]">
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#09090b]">
          {children}
        </div>
      </body>
    </html>
  );
}
