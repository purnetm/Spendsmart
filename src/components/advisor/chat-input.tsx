"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const isActive = value.trim().length > 0 && !disabled;

  return (
    <div className="px-4 py-3 bg-n-950/95 backdrop-blur border-t border-white/[0.07]">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Waiting for response…" : "Ask anything about your finances…"}
          disabled={disabled}
          className="flex-1 rounded-full border border-white/[0.10] bg-white/[0.05] px-4 py-2.5 font-body text-[13px] text-white placeholder:text-white/25 outline-none focus:border-pri-400/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ borderWidth: "1px" }}
        />
        <button
          onClick={handleSend}
          disabled={!isActive}
          className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            isActive
              ? "bg-gradient-to-br from-pri-400 to-pri-600"
              : "bg-white/[0.08]"
          }`}
        >
          <Send
            size={15}
            className={isActive ? "text-white" : "text-white/25"}
          />
        </button>
      </div>
    </div>
  );
}
