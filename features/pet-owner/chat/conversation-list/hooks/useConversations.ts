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
    staleTime: 5 * 60 * 1000,
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
    const name = thread.provider?.businessName || "Nhà cung cấp";
    const avatarUrl =
      thread.provider?.avatarUrl ||
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
      category: "service",
      lastMessage: thread.lastMessage || "",
      lastMessageAtLabel,
      unreadCount: thread.unreadCount || 0,
      isOnline: false,
      isPinned: false,
      booking: thread.booking,
      createAt: thread.createAt,
      lastMessageAt: thread.lastMessageAt,
    };
  });

  const keyword = search.trim().toLowerCase();

  const filtered = conversations.filter((item) => {
    let matchesFilter = true;
    if (filter === "doctor" || filter === "service") {
      matchesFilter = item.category === filter;
    } else if (filter === "active") {
      matchesFilter = !item.booking || item.booking.status !== "CANCELLED";
    } else if (filter === "cancelled") {
      matchesFilter = item.booking?.status === "CANCELLED";
    }

    const matchesSearch =
      keyword.length === 0 || item.name.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    const dateA = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    const dateB = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
    return dateB - dateA;
  });

  return {
    conversations: sorted,
    filter,
    setFilter,
    search,
    setSearch,
    isLoading,
    refetch,
    isRefetching,
  };
}
