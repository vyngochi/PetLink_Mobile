import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRootNavigationState, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, InteractionManager, Platform } from "react-native";
import { notificationKeys } from "./useGetNotifications";

export interface PushNotificationState {
  expoPushToken?: string;
  notification?: Notifications.Notification;
}

type NotificationPayload = {
  bookingId?: string;
};

async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("default", {
    name: "Thông báo",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#006E1C",
  });
}

async function getExpoPushToken(): Promise<string | undefined> {
  await ensureAndroidChannel();

  if (!Device.isDevice) {
    console.warn("[push] Cần thiết bị thật để nhận push notification");
    return undefined;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  const finalStatus =
    existingStatus === "granted"
      ? existingStatus
      : (await Notifications.requestPermissionsAsync()).status;

  if (finalStatus !== "granted") {
    console.warn("[push] Người dùng từ chối quyền nhận thông báo");
    return undefined;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId) {
    console.warn("[push] Thiếu EAS projectId trong app.json");
    return undefined;
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  return token.data;
}

export const usePushNotifications = (): PushNotificationState => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hydrating = useAuthStore((state) => state.hydrating);

  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();

  const isNavigationReady = Boolean(useRootNavigationState()?.key);

  const syncedToken = useRef<string | null>(null);
  const handledResponseId = useRef<string | null>(null);

  const syncToken = useCallback(async (token?: string) => {
    const value = token ?? (await getExpoPushToken());
    if (!value || value === syncedToken.current) return;

    await authService.saveDeviceToken(value);
    syncedToken.current = value;
    setExpoPushToken(value);
  }, []);

  const navigateFromPayload = useCallback(
    (payload: NotificationPayload) => {
      if (payload.bookingId) {
        router.push({
          pathname: "/pet-owner/booking/[id]",
          params: { id: payload.bookingId },
        });
        return;
      }

      router.push("/pet-owner/notifications");
    },
    [router],
  );

  const handleResponse = useCallback(
    (response: Notifications.NotificationResponse | null) => {
      if (!response) return;

      const responseId = response.notification.request.identifier;
      if (handledResponseId.current === responseId) return;
      handledResponseId.current = responseId;

      queryClient.invalidateQueries({ queryKey: notificationKeys.all });

      const payload = (response.notification.request.content.data ??
        {}) as NotificationPayload;
      navigateFromPayload(payload);
    },
    [navigateFromPayload, queryClient],
  );

  useEffect(() => {
    if (hydrating) return;

    if (!isAuthenticated) {
      syncedToken.current = null;
      setExpoPushToken(undefined);
      return;
    }

    syncToken().catch((error) => {
      console.warn("[push] Đăng ký push notification thất bại:", error);
    });
  }, [hydrating, isAuthenticated, syncToken]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active" || syncedToken.current) return;

      syncToken().catch((error) => {
        console.warn(
          "[push] Thử đăng ký lại push notification thất bại:",
          error,
        );
      });
    });

    return () => subscription.remove();
  }, [isAuthenticated, syncToken]);

  useEffect(() => {
    if (hydrating || !isAuthenticated || !isNavigationReady) return;

    let active = true;
    const subscriptions: { remove: () => void }[] = [];

    const task = InteractionManager.runAfterInteractions(() => {
      if (!active) return;

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      subscriptions.push(
        Notifications.addNotificationReceivedListener((incoming) => {
          setNotification(incoming);
          queryClient.invalidateQueries({ queryKey: notificationKeys.all });
        }),
        Notifications.addNotificationResponseReceivedListener((response) => {
          handleResponse(response);
        }),
        Notifications.addPushTokenListener((token) => {
          syncToken(token.data).catch((error) => {
            console.warn("[push] Cập nhật device token mới thất bại:", error);
          });
        }),
      );

      Notifications.getLastNotificationResponseAsync()
        .then((response) => {
          if (active) handleResponse(response);
        })
        .catch(() => {});
    });

    return () => {
      active = false;
      task.cancel();
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, [
    hydrating,
    isAuthenticated,
    isNavigationReady,
    handleResponse,
    queryClient,
    syncToken,
  ]);

  return {
    expoPushToken,
    notification,
  };
};
