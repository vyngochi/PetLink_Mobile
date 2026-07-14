import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { socketService } from "@/lib/socket";
import { notificationKeys } from "./useGetNotifications";

export function useNotificationRealtime() {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    socketService.connect();

    const handleNewNotification = () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    };

    socketService.on("notification:new", handleNewNotification);

    return () => {
      socketService.off("notification:new", handleNewNotification);
    };
  }, [isAuthenticated, queryClient]);
}
