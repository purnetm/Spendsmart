"use client";

import { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { ChatBubble } from "@/components/shared/chat-bubble";
import { TypingDots } from "@/components/shared/typing-dots";
import type { Message } from "@/types";

interface MessageListProps {
  messages: Message[];
  typing: boolean;
}

export function MessageList({ messages, typing }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map((m, i) => (
        <ChatBubble
          key={m.id}
          msg={m}
          isLast={i === messages.length - 1 && !typing}
        />
      ))}

      {typing && (
        <div className="flex items-end gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pri-400 to-pri-600 flex items-center justify-center flex-shrink-0">
            <Sparkles size={10} className="text-white" />
          </div>
          <TypingDots />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
