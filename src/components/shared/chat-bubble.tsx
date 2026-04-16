"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

interface ChatBubbleProps {
  msg: Message;
  isLast: boolean;
}

function renderText(text: string, isAI: boolean) {
  return text.split("\n").map((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={lineIdx}>
        {lineIdx > 0 && <br />}
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong
                key={partIdx}
                className={cn(
                  "font-semibold",
                  isAI ? "text-n-800" : "text-white"
                )}
              >
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={partIdx}>{part}</span>;
        })}
      </span>
    );
  });
}

export function ChatBubble({ msg, isLast }: ChatBubbleProps) {
  const isAI = msg.role === "ai";

  return (
    <div
      className={cn(
        "flex flex-col mb-3",
        isAI ? "items-start" : "items-end"
      )}
    >
      {/* AI header */}
      {isAI && (
        <div className="flex items-center gap-1 mb-1">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pri-400 to-pri-600 flex items-center justify-center">
            <Sparkles size={10} className="text-white" />
          </div>
          <span className="font-display text-[10px] font-semibold text-n-400">
            SpendSmart AI
          </span>
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[88%] px-4 py-3 font-body text-[13px] leading-relaxed",
          isAI
            ? "bg-n-100 text-n-700 rounded-[4px_14px_14px_14px]"
            : "bg-gradient-to-br from-pri-500 to-pri-700 text-white rounded-[14px_14px_4px_14px]"
        )}
      >
        {renderText(msg.text, isAI)}
      </div>

      {/* Action chips */}
      {msg.actions && isLast && (
        <div className="flex flex-wrap gap-1 mt-2">
          {msg.actions.map((action) => (
            <button
              key={action}
              onClick={() => msg.onAction?.(action)}
              className="rounded-full border border-pri-200 bg-pri-50 font-body text-[11px] text-pri-700 font-medium px-3 py-1.5"
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
