import { useState } from "react";

import { CONVERSATIONS_MOCK } from "@/features/pet-owner/chat/shared/constants/chat-mock";
import type {
  Conversation,
  ConversationFilter,
} from "@/features/pet-owner/chat/shared/types";

export function useConversations() {
  const [conversations] = useState<Conversation[]>(CONVERSATIONS_MOCK);
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [search, setSearch] = useState("");

  const keyword = search.trim().toLowerCase();

  const filtered = conversations.filter((item) => {
    const matchesFilter = filter === "all" || item.category === filter;
    const matchesSearch =
      keyword.length === 0 || item.name.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch;
  });

  return { conversations: filtered, filter, setFilter, search, setSearch };
}
