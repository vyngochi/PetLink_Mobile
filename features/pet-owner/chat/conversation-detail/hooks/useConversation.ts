import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { chatService } from "@/features/pet-owner/chat/shared/services/chat.service";
import type { ChatMessage } from "@/features/pet-owner/chat/shared/types";
import { socketService } from "@/lib/socket";

export function useConversation(threadId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // Fetch conversation messages
  const { data: rawMessages = [], isLoading } = useQuery({
    queryKey: ["chat-messages", threadId],
    queryFn: () => chatService.getThreadMessages(threadId),
    enabled: !!threadId,
  });

  // Extract conversation info from the list cache if available
  const threads = queryClient.getQueryData<any[]>(["chat-threads"]) || [];
  const thread = threads.find((t) => t.id === threadId);
  const providerName = thread?.provider?.businessName || "Chi tiết cuộc trò chuyện";

  const conversation = {
    id: threadId,
    name: providerName,
    avatarUrl: thread?.provider?.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(providerName),
    category: "service" as const,
    lastMessage: thread?.lastMessage || "",
    lastMessageAtLabel: "",
    unreadCount: thread?.unreadCount || 0,
    isOnline: true,
    isPinned: false,
    booking: thread?.booking,
  };

  // Setup Socket Listeners
  useEffect(() => {
    if (!threadId) return;

    socketService.connect();
    socketService.emit("chat:join", { threadId });

    const handleNewMessage = (payload: any) => {
      // payload usually is { threadId, bookingId, message }
      if (
        payload.threadId === threadId ||
        payload.message?.threadId === threadId
      ) {
        queryClient.invalidateQueries({
          queryKey: ["chat-messages", threadId],
        });
      }
    };

    const handleRead = (payload: any) => {
      if (payload.threadId === threadId) {
        queryClient.invalidateQueries({
          queryKey: ["chat-messages", threadId],
        });
      }
    };

    socketService.on("chat:message:new", handleNewMessage);
    socketService.on("chat:read", handleRead);

    // Optionally mark as read when entering
    chatService.markAsRead(threadId).catch(() => {});

    return () => {
      socketService.emit("chat:leave", { threadId });
      socketService.off("chat:message:new", handleNewMessage);
      socketService.off("chat:read", handleRead);
    };
  }, [threadId, queryClient]);

  // Map to UI model
  const messages: ChatMessage[] = rawMessages.map((msg: any) => {
    const isMe = msg.senderId === user?.id;
    const sentAtLabel = msg.createAt
      ? new Date(msg.createAt).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return {
      id: msg.id,
      sender: isMe ? "me" : "them",
      text: msg.content || "",
      sentAtLabel,
      isRead: !!msg.readAt,
    };
  });

  // Send message mutation
  const { mutateAsync } = useMutation({
    mutationFn: (text: string) => chatService.sendMessage(threadId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-messages", threadId] });
    },
  });

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !threadId) return;

    // Optimistic UI update could be done here before awaiting
    try {
      await mutateAsync(trimmed);
    } catch (error) {
      console.error("Gửi tin nhắn thất bại", error);
    }
  };

  return { conversation, messages, sendMessage, isLoading };
}
