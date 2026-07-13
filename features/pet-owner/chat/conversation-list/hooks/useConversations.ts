import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { chatService } from "@/features/pet-owner/chat/shared/services/chat.service";
import type {
  Conversation,
  ConversationFilter,
} from "@/features/pet-owner/chat/shared/types";
import { socketService } from "@/lib/socket";

export function useConversations() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [search, setSearch] = useState("");

  const {
    data: rawThreads = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["chat-threads"],
    queryFn: chatService.getThreads,
  });

  useEffect(() => {
    socketService.connect();

    const handleNewMessage = () => {
      // Refresh list when a new message arrives
      queryClient.invalidateQueries({ queryKey: ["chat-threads"] });
    };

    socketService.on("chat:message:new", handleNewMessage);

    return () => {
      socketService.off("chat:message:new", handleNewMessage);
    };
  }, [queryClient]);

  // Map backend thread to UI Conversation structure
  const conversations: Conversation[] = rawThreads.map((thread: any) => {
    const name =
      thread.provider?.user?.fullName ||
      thread.customer?.user?.fullName ||
      "Người dùng";
    const avatarUrl =
      thread.provider?.user?.avatar ||
      thread.customer?.user?.avatar ||
      "https://ui-avatars.com/api/?name=" + encodeURIComponent(name);

    const lastMessageAtLabel = thread.lastMessageAt
      ? new Date(thread.lastMessageAt).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return {
      id: thread.id,
      name,
      avatarUrl,
      category: "service", // Assume service by default or map properly if backend returns it
      lastMessage: thread.lastMessage || "",
      lastMessageAtLabel,
      unreadCount: thread.unreadCount || 0,
      isOnline: false, // Could integrate with presence later
      isPinned: false,
    };
  });

  const keyword = search.trim().toLowerCase();

  const filtered = conversations.filter((item) => {
    const matchesFilter = filter === "all" || item.category === filter;
    const matchesSearch =
      keyword.length === 0 || item.name.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch;
  });

  return {
    conversations: filtered,
    filter,
    setFilter,
    search,
    setSearch,
    isLoading,
    refetch,
    isRefetching,
  };
}
