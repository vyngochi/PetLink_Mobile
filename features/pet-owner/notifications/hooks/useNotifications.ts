import { useMemo } from "react";

import { NOTIFICATIONS_MOCK } from "@/features/pet-owner/notifications/constants/notifications-mock";
import type {
  AppNotification,
  NotificationSection,
} from "@/features/pet-owner/notifications/types";

export function useNotifications() {
  const sections = useMemo<NotificationSection[]>(() => {
    const grouped: NotificationSection[] = [];

    NOTIFICATIONS_MOCK.forEach((item) => {
      const existing = grouped.find(
        (section) => section.title === item.section
      );
      if (existing) {
        existing.items.push(item);
      } else {
        grouped.push({ title: item.section, items: [item] });
      }
    });

    return grouped;
  }, []);

  const unreadCount = useMemo(
    () => NOTIFICATIONS_MOCK.filter((item) => !item.read).length,
    []
  );

  return { sections, unreadCount };
}

export function useNotificationDetail(id?: string) {
  return useMemo<AppNotification | undefined>(
    () => NOTIFICATIONS_MOCK.find((item) => item.id === id),
    [id]
  );
}
