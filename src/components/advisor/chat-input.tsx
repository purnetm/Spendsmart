"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const isActive = value.trim().length > 0;

  return (
    <div className="px-4 py-3 bg-white/95 backdrop-blur border-t border-n-100">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your finances…"
          className="flex-1 rounded-full border border-n-200 bg-n-50 px-4 py-2.5 font-body text-[13px] text-n-800 placeholder:text-n-400 outline-none focus:border-pri-300 transition-colors"
          style={{ borderWidth: "1.5px" }}
        />
        <button
          onClick={handleSend}
          className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            isActive
              ? "bg-gradient-to-br from-pri-400 to-pri-600 shadow-sm"
              : "bg-n-200"
          }`}
        >
          <Send
            size={15}
            className={isActive ? "text-white" : "text-n-400"}
          />
        </button>
      </div>
    </div>
  );
}
