import { useMemo } from "react";
import type {
  AppNotification,
  NotificationSection,
  NotificationType,
} from "@/features/pet-owner/notifications/types";
import { useGetNotifications } from "./useGetNotifications";

export function useNotifications() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useGetNotifications();

  const sections = useMemo<NotificationSection[]>(() => {
    const grouped: NotificationSection[] = [];
    const now = new Date();

    const items = data?.pages.flatMap((page) => page.items) ?? [];

    items.forEach((item) => {
      const date = new Date(item.createdAt);
      const isToday = date.toDateString() === now.toDateString();
      const sectionTitle = isToday ? "Hôm nay" : "Cũ hơn";
      
      const appNotification: AppNotification = {
        id: item.id,
        type: (item.type?.toLowerCase().includes("promo") ? "promo" : "booking") as NotificationType,
        title: item.title,
        message: item.body,
        time: date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        section: sectionTitle,
        read: item.isRead,
      };

      const existing = grouped.find((section) => section.title === sectionTitle);
      if (existing) {
        existing.items.push(appNotification);
      } else {
        grouped.push({ title: sectionTitle, items: [appNotification] });
      }
    });

    return grouped;
  }, [data]);

  const unreadCount = useMemo(() => {
     return sections.reduce((acc, section) => acc + section.items.filter(i => !i.read).length, 0);
  }, [sections]);

  return { 
    sections, 
    unreadCount, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading,
    refetch 
  };
}

export function useNotificationDetail(id?: string) {
  const { data } = useGetNotifications();
  
  return useMemo<AppNotification | undefined>(() => {
    if (!id || !data) return undefined;
    
    const item = data.pages.flatMap((page) => page.items).find((item) => item.id === id);
    if (!item) return undefined;

    const date = new Date(item.createdAt);
    
    return {
      id: item.id,
      type: (item.type?.toLowerCase().includes("promo") ? "promo" : "booking") as NotificationType,
      title: item.title,
      message: item.body,
      time: date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      section: "",
      read: item.isRead,
      data: item.data, // Attach raw data for detail view
    };
  }, [data, id]);
}
