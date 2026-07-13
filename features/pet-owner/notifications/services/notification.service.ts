import api from "@/api/client";

export interface GetNotificationsParams {
  page?: number;
  pageSize?: number;
  type?: string;
  unread?: boolean;
}

export const notificationService = {
  getNotifications: (params: GetNotificationsParams = {}) => {
    return api.get("/mobile/notifications", { params });
  },
  markAsRead: (id: string) => {
    return api.patch(`/mobile/notifications/${id}/read`);
  },
  markAllAsRead: () => {
    return api.patch("/mobile/notifications/read-all");
  },
};
