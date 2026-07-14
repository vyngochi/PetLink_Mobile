import type { ConversationFilter } from "@/features/pet-owner/chat/shared/types";

export const CHAT_FILTERS: { value: ConversationFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Đang diễn ra" },
  { value: "cancelled", label: "Đã hủy" },
];
