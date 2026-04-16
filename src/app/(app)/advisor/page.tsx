"use client";

import { useChat } from "@/hooks/use-chat";
import { MessageList } from "@/components/advisor/message-list";
import { ChatInput } from "@/components/advisor/chat-input";

export default function AdvisorPage() {
  const { messages, typing, handleSend, handleAction } = useChat();

  const messagesWithHandlers = messages.map((m) => ({
    ...m,
    onAction: handleAction,
  }));

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      <MessageList messages={messagesWithHandlers} typing={typing} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
