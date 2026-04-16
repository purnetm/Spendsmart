import { useState, useEffect, useCallback } from "react";
import { AI_INIT, AI_MAP, AI_DEFAULT } from "@/lib/data/ai-responses";
import type { Message } from "@/types";

let nextId = 1;
function uid() {
  return nextId++;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping]     = useState(false);

  const handleAction = useCallback((action: string) => {
    // Remove actions from all existing messages
    setMessages((prev) =>
      prev.map((m) => ({ ...m, actions: undefined, onAction: undefined }))
    );

    // Add user message
    const userMsg: Message = { id: uid(), role: "user", text: action };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI response
    setTyping(true);
    const delay = 1000 + Math.random() * 800;

    setTimeout(() => {
      const response = AI_MAP[action] ?? AI_DEFAULT;
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "ai",
          text: response.text,
          actions: response.actions,
          onAction: handleAction,
        },
      ]);
      setTyping(false);
    }, delay);
  }, []);

  const handleSend = useCallback(
    (text: string) => {
      // Remove actions from all existing messages
      setMessages((prev) =>
        prev.map((m) => ({ ...m, actions: undefined, onAction: undefined }))
      );

      // Add user message
      const userMsg: Message = { id: uid(), role: "user", text };
      setMessages((prev) => [...prev, userMsg]);

      // Simulate AI response
      setTyping(true);
      const delay = 1000 + Math.random() * 800;

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "ai",
            text: AI_DEFAULT.text,
            actions: AI_DEFAULT.actions,
            onAction: handleAction,
          },
        ]);
        setTyping(false);
      }, delay);
    },
    [handleAction]
  );

  // Initial greeting
  useEffect(() => {
    setTyping(true);
    const timer = setTimeout(() => {
      setMessages([
        {
          id: uid(),
          role: "ai",
          text: AI_INIT,
          actions: ["Analyze restaurants", "Review subscriptions", "Check BNPL health"],
          onAction: handleAction,
        },
      ]);
      setTyping(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [handleAction]);

  return { messages, typing, handleSend, handleAction };
}
