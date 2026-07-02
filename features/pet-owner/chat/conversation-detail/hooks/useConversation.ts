import { useState } from "react";

import {
  CONVERSATIONS_MOCK,
  MESSAGES_MOCK,
} from "@/features/pet-owner/chat/shared/constants/chat-mock";
import type { ChatMessage } from "@/features/pet-owner/chat/shared/types";

export function useConversation(conversationId: string) {
  const conversation = CONVERSATIONS_MOCK.find(
    (item) => item.id === conversationId
  );
  const [messages, setMessages] = useState<ChatMessage[]>(
    MESSAGES_MOCK[conversationId] ?? []
  );

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const sentAtLabel = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((current) => [
      ...current,
      {
        id: `msg-${Date.now()}`,
        sender: "me",
        text: trimmed,
        sentAtLabel,
        isRead: false,
      },
    ]);
  };

  return { conversation, messages, sendMessage };
}
