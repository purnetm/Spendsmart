"use client";

export function TypingDots() {
  return (
    <div className="flex gap-1 p-3 bg-white/[0.07] border border-white/[0.07] w-fit rounded-[14px_14px_14px_4px]">
      <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-typing d1" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-typing d2" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-typing d3" />
    </div>
  );
}
