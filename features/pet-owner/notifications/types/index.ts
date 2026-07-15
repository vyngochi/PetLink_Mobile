export type NotificationType =
  | "appointment"
  | "booking"
  | "vaccination"
  | "promo";

export interface NotificationBookingSummary {
  petName: string;
  service: string;
  scheduledFor: string;
  clinicName: string;
  clinicAddress: string;
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  section: string;
  read: boolean;
  data?: any;
  category?: string;
  detailMessage?: string;
  imageUrl?: string;
  booking?: NotificationBookingSummary;
}

export interface NotificationSection {
  title: string;
  items: AppNotification[];
}
