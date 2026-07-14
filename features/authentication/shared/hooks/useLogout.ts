import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useCallback } from "react";

import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { socketService } from "@/lib/socket";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useCallback(async () => {
    try {
      await Notifications.setBadgeCountAsync(0);
    } catch {}

    socketService.disconnect();
    await logout();
    queryClient.clear();
  }, [logout, queryClient]);
};
