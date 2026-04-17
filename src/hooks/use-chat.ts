"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AI_INIT } from "@/lib/data/ai-responses";
import type { Message } from "@/types";

let nextId = 1;
function uid() {
  return nextId++;
}

/** Map internal Message[] to the shape Anthropic's API expects. */
function toApiMessages(msgs: Message[]) {
  return msgs.map((m) => ({
    role: m.role === "ai" ? ("assistant" as const) : ("user" as const),
    content: m.text,
  }));
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);       // waiting for first token
  const [streaming, setStreaming] = useState(false);  // tokens actively arriving

  // Always-current reference so callbacks can read state without stale closures
  const messagesRef = useRef<Message[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const send = useCallback(async (userText: string) => {
    // Prevent concurrent sends
    if (streaming || typing) return;

    // Strip action chips from all existing messages, add user message
    const cleared = messagesRef.current.map((m) => ({
      ...m,
      actions: undefined,
      onAction: undefined,
    }));
    const userMsg: Message = { id: uid(), role: "user", text: userText };
    const next = [...cleared, userMsg];

    setMessages(next);
    setTyping(true);
    setStreaming(true);

    try {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toApiMessages(next) }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error(`API error ${res.status}`);

      // First token received — hide typing dots, add empty assistant bubble
      setTyping(false);
      const aiMsgId = uid();
      setMessages((prev) => [...prev, { id: aiMsgId, role: "ai", text: "" }]);

      // Stream SSE from Anthropic SDK
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw || raw === "[DONE]") continue;

          try {
            const evt = JSON.parse(raw);
            if (
              evt.type === "content_block_delta" &&
              evt.delta?.type === "text_delta"
            ) {
              fullText += evt.delta.text;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMsgId ? { ...m, text: fullText } : m
                )
              );
            }
          } catch {
            // malformed chunk — skip
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
      setStreaming(false);
    }
  }, [streaming, typing]);

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (trimmed) send(trimmed);
    },
    [send]
  );

  const handleAction = useCallback(
    (action: string) => {
      send(action);
    },
    [send]
  );

  // Initial AI greeting — keeps the action chips from the original design
  useEffect(() => {
    setTyping(true);
    const timer = setTimeout(() => {
      const initMsg: Message = {
        id: uid(),
        role: "ai",
        text: AI_INIT,
        actions: ["Analyze restaurants", "Review subscriptions", "Check BNPL health"],
      };
      setMessages([initMsg]);
      messagesRef.current = [initMsg];
      setTyping(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return { messages, typing, streaming, handleSend, handleAction };
}
