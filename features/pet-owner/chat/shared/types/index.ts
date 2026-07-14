export type ConversationCategory = "doctor" | "service";

export type ConversationFilter =
  | "all"
  | ConversationCategory
  | "active"
  | "cancelled";

export interface ConversationBooking {
  id: string;
  status: string;
  appointmentStart: string;
  service: {
    id: string;
    name: string;
  };
}

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
  booking?: ConversationBooking;
  createAt?: string;
  lastMessageAt?: string;
}

export type MessageSender = "me" | "them";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  sentAtLabel: string;
  isRead: boolean;
}
