import { unwrapData } from "@/lib/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  notificationService,
  type GetNotificationsParams,
} from "../services/notification.service";

export interface NotificationApiItem {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  readAt: string | null;
  createAt: string;
}

export interface NotificationListResponse {
  items: NotificationApiItem[];
  unreadCount: number;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (params: GetNotificationsParams) =>
    [...notificationKeys.all, "list", params] as const,
};

export const useGetNotifications = (params: GetNotificationsParams = {}) => {
  return useInfiniteQuery({
    queryKey: notificationKeys.list(params),
    queryFn: async ({ pageParam }) => {
      const res = await notificationService.getNotifications({
        ...params,
        page: pageParam,
      });
      return unwrapData<NotificationListResponse>(res);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    refetchOnWindowFocus: true,
  });
};
