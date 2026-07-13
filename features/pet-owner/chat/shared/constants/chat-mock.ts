import type { ChatMessage, Conversation } from "@/features/pet-owner/chat/shared/types";

export const CONVERSATIONS_MOCK: Conversation[] = [
  {
    id: "chat-emily-chen",
    name: "BS. Emily Chen",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5QQoWoErcDcVNdIKaTZ1KrR2UAGqSCNMEXzOuPI1mIb9nce00zZ49jR-FX-fFgarEFPqPG4wy6H0mJqRxY25pYlXI49fEIDoGbt7rlr7QSfnQyX_5a01p2gayqBh33Wf5entWMeyicf4ce701yb4ZTqKaBo7mrSZyJtqre-P_Ez3fPlBCqXUJSxDM40ErldGUBDazixTtvSrc9B0DtBCGIi7vKOUUnqB-hvh2kvBx0zjMYhikOYRcMN3bYGtGwy0awR5_80ilUilZ",
    category: "doctor",
    lastMessage: "Kết quả xét nghiệm của Sparky đã có. Bé đang hồi phục rất tốt!",
    lastMessageAtLabel: "2 phút",
    unreadCount: 2,
    isOnline: true,
    isPinned: true,
  },
  {
    id: "chat-healthy-paws",
    name: "Healthy Paws Clinic",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGlZuipRylLofuqpHKYZUQ2d_-Sguqy_gi1GqNjo6ykZQ2BtWaZInIFm-73GJtONO78HY2b8iLQnKeuOoUVSUtN3Vmr20prJchGRuAx0VdBvlYaG5El7tvmb9rAnpin6AlRiJ5E98vyuVvJSbs5fQcoZNhb18PT2dCY6FRO_y7BQ_j7SXnokwZAwcwTm6dLByJFxoeQ_bGe4XwTTwWxEdHoAEs4U3MMi9Sp3LABeOpt-vzbqLjSVDIyNwHrb4CJq7OvNnhashEOoNk",
    category: "service",
    lastMessage: "Lịch grooming của bạn đã được xác nhận vào 10:00 sáng mai.",
    lastMessageAtLabel: "15 phút",
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
  },
  {
    id: "chat-mark-wilson",
    name: "Mark Wilson (Trông thú)",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Dhk-YVDSbj9tRQPwtBYt4h1J_KH_-nt8F8M4crtPeMQOqP-M-fJu-1cP4RAJLr6iYfK9MKzna74bg0G4JDbgeRFCpypHErOnPdQotCLs6o1Wz_kuG44JWjXZhlgjMugF7W1pd_ZfK_cDWiSIRg39LgLIM9LA4F9hbSAJntHZRsOgzpk-WXVgYONZES-kfsVlTSs8r4YmZPvRGGF5-pUDXxfOAPRk_gCb3GNVDlzHAcK6_VSczdtW_iirS1bXymPsbp5dnII8xJtL",
    category: "service",
    lastMessage: "Luna hôm nay đi dạo rất vui! Mình đã tải ảnh lên hồ sơ của bé.",
    lastMessageAtLabel: "1 giờ",
    unreadCount: 0,
    isOnline: true,
    isPinned: false,
  },
  {
    id: "chat-aris-thorne",
    name: "BS. Aris Thorne",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZEMMcgj97D9SahGyMxCoWRfutWhtbtg7OX01oYdYlcNPH4y4qMSQvPgWbx44nSbdpu85CT50SWbyWYLvjJI84INpdhy2JYwn00pZuGCoywKXHBO9MdXY7qBn7tryJAf0vq-Z718J0QqEBAYMUxyx-_lv9qiQK_-PoxZAwhH6bbWwUfO5kxlppsfAV39U-CTOwfpb7w5DWbQ-c1l49McHHu3oluQ0khBynDPFYjG6KTNGbhfOxYPfe2v8fnDw9xDugTVBy8BE_Cqir",
    category: "doctor",
    lastMessage: "Nhớ mang theo hồ sơ bệnh án khi đến buổi tư vấn nhé.",
    lastMessageAtLabel: "3 giờ",
    unreadCount: 1,
    isOnline: false,
    isPinned: false,
  },
  {
    id: "chat-pet-insurance",
    name: "Hỗ trợ bảo hiểm thú cưng",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdMdq_TOD10l5O79hXk9kQT906WBknvMxfdQDKHv_I2Xicx8h3yJTsHdK7XwcnVJc7SdkmwI08ivBczIWLIMtG08IjaDp5XYLmxrfh2GC7fpouizzgeDRZRmATAGjCcdZGUHBB0Q97wu9xsJX5nJRXL6XtfjDt_s-_xVqwe0dYnwKtoa4ftOIl9kZ9Nd6D69rwH13415a2DOFkTSrhGNKmJwW7KskbP2MVgwinGKe5jOPnr9cjIWlsZ1PmQE_IzYtq6CgqqSVr8XnD",
    category: "service",
    lastMessage: "Chúng tôi đã nhận yêu cầu bồi thường #8812 và đang xử lý.",
    lastMessageAtLabel: "Hôm qua",
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
  },
];

export const MESSAGES_MOCK: Record<string, ChatMessage[]> = {
  "chat-emily-chen": [
    {
      id: "msg-emily-1",
      sender: "them",
      text: "Chào Sarah! Lịch khám của Bella vào ngày mai đã được xác nhận. Bạn có lo lắng gì đặc biệt không?",
      sentAtLabel: "09:42",
      isRead: true,
    },
    {
      id: "msg-emily-2",
      sender: "me",
      text: "Chào bác sĩ! Không có gì đặc biệt ạ, chỉ là khám định kỳ thôi.",
      sentAtLabel: "09:45",
      isRead: true,
    },
    {
      id: "msg-emily-3",
      sender: "them",
      text: "Kết quả xét nghiệm của Sparky đã có. Bé đang hồi phục rất tốt!",
      sentAtLabel: "10:12",
      isRead: false,
    },
  ],
  "chat-healthy-paws": [
    {
      id: "msg-paws-1",
      sender: "them",
      text: "Lịch grooming của bạn đã được xác nhận vào 10:00 sáng mai.",
      sentAtLabel: "09:30",
      isRead: true,
    },
  ],
  "chat-mark-wilson": [
    {
      id: "msg-mark-1",
      sender: "them",
      text: "Luna hôm nay đi dạo rất vui! Mình đã tải ảnh lên hồ sơ của bé.",
      sentAtLabel: "08:50",
      isRead: true,
    },
    {
      id: "msg-mark-2",
      sender: "me",
      text: "Cảm ơn Mark nhiều nhé, mình sẽ xem ngay!",
      sentAtLabel: "09:05",
      isRead: true,
    },
  ],
  "chat-aris-thorne": [
    {
      id: "msg-aris-1",
      sender: "them",
      text: "Nhớ mang theo hồ sơ bệnh án khi đến buổi tư vấn nhé.",
      sentAtLabel: "07:15",
      isRead: false,
    },
  ],
  "chat-pet-insurance": [
    {
      id: "msg-insurance-1",
      sender: "me",
      text: "Mình vừa gửi yêu cầu bồi thường cho lần khám tuần trước.",
      sentAtLabel: "14:20",
      isRead: true,
    },
    {
      id: "msg-insurance-2",
      sender: "them",
      text: "Chúng tôi đã nhận yêu cầu bồi thường #8812 và đang xử lý.",
      sentAtLabel: "15:02",
      isRead: true,
    },
  ],
};
