"use client";

export function TypingDots() {
  return (
    <div className="flex gap-1 p-3 bg-n-100 w-fit rounded-[14px_14px_14px_4px]">
      <div className="w-1.5 h-1.5 rounded-full bg-n-400 animate-typing d1" />
      <div className="w-1.5 h-1.5 rounded-full bg-n-400 animate-typing d2" />
      <div className="w-1.5 h-1.5 rounded-full bg-n-400 animate-typing d3" />
    </div>
  );
}
