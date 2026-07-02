import { useLocalSearchParams } from "expo-router";
import React from "react";

import { ChatDetailView } from "@/features/pet-owner/chat/conversation-detail/views/ChatDetailView";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const conversationId = typeof id === "string" ? id : "";

  return <ChatDetailView conversationId={conversationId} />;
}
