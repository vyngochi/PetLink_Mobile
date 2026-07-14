import { unwrapData } from "@/lib/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  notificationService,
  type GetNotificationsParams,
} from "../services/notification.service";

// Need to define response type.
export interface NotificationApiResponse {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  data: any;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListResponse {
  items: NotificationApiResponse[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
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
    queryFn: async ({ pageParam = 1 }) => {
      const res = await notificationService.getNotifications({
        ...params,
        page: pageParam,
      });
      return unwrapData<NotificationListResponse>(res);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: true,
  });
};
