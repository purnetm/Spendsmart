"use client";

import { useChat } from "@/hooks/use-chat";
import { MessageList } from "@/components/advisor/message-list";
import { ChatInput } from "@/components/advisor/chat-input";

export default function AdvisorPage() {
  const { messages, typing, streaming, handleSend, handleAction } = useChat();

  const messagesWithHandlers = messages.map((m) => ({
    ...m,
    onAction: handleAction,
  }));

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messagesWithHandlers} typing={typing} />
      <ChatInput onSend={handleSend} disabled={streaming || typing} />
    </div>
  );
}
