import api from "@/api/client";

export const chatService = {
  getThreads: async () => {
    const res = await api.get("/mobile/chat/threads");
    // Standard unwrap if unwrapData is used, or directly access data
    return res.data.data?.items || res.data.data || [];
  },

  getThreadMessages: async (threadId: string) => {
    const res = await api.get(`/mobile/chat/threads/${threadId}/messages`);
    return res.data.data?.items || res.data.data || [];
  },

  getOrCreateThread: async (bookingId: string) => {
    const res = await api.get(`/mobile/bookings/${bookingId}/chat/thread`);
    return res.data.data;
  },

  sendMessage: async (threadId: string, content: string) => {
    const res = await api.post(`/mobile/chat/threads/${threadId}/messages`, {
      content,
    });
    return res.data.data;
  },

  markAsRead: async (threadId: string) => {
    const res = await api.patch(`/mobile/chat/threads/${threadId}/read`);
    return res.data.data;
  },
};
