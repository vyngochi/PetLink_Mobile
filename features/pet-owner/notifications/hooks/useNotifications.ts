import { useMemo } from "react";

import type {
  AppNotification,
  NotificationSection,
} from "@/features/pet-owner/notifications/types";
import { toNotificationType } from "@/features/pet-owner/notifications/utils/notification-visuals";
import {
  useGetNotifications,
  type NotificationApiItem,
} from "./useGetNotifications";

function toAppNotification(item: NotificationApiItem): AppNotification {
  const date = new Date(item.createAt);
  const isValidDate = !Number.isNaN(date.getTime());
  const isToday =
    isValidDate && date.toDateString() === new Date().toDateString();

  const time = !isValidDate
    ? ""
    : isToday
      ? date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });

  return {
    id: item.id,
    type: toNotificationType(item.type),
    title: item.title,
    message: item.message,
    time,
    section: isToday ? "Hôm nay" : "Cũ hơn",
    read: item.readAt != null,
    data: item.data,
  };
}

export function useNotifications() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetNotifications();

  const sections = useMemo<NotificationSection[]>(() => {
    const grouped: NotificationSection[] = [];
    const items = data?.pages.flatMap((page) => page.items) ?? [];

    for (const item of items) {
      const notification = toAppNotification(item);
      const existing = grouped.find(
        (section) => section.title === notification.section,
      );

      if (existing) {
        existing.items.push(notification);
      } else {
        grouped.push({ title: notification.section, items: [notification] });
      }
    }

    return grouped;
  }, [data]);

  const unreadCount = data?.pages[0]?.unreadCount ?? 0;

  return {
    sections,
    unreadCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  };
}

export function useNotificationDetail(id?: string) {
  const { data } = useGetNotifications();

  return useMemo<AppNotification | undefined>(() => {
    if (!id) return undefined;

    const item = data?.pages
      .flatMap((page) => page.items)
      .find((entry) => entry.id === id);

    return item ? toAppNotification(item) : undefined;
  }, [data, id]);
}
