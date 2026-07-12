export type ConversationCategory = "doctor" | "service";

export type ConversationFilter = "all" | ConversationCategory;

export interface Conversation {
  id: string;
  name: string;
  avatarUrl: string;
  category: ConversationCategory;
  lastMessage: string;
  lastMessageAtLabel: string;
  unreadCount: number;
  isOnline: boolean;
  isPinned: boolean;
}

export type MessageSender = "me" | "them";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  sentAtLabel: string;
  isRead: boolean;
}
