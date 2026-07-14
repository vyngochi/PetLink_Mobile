import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const usePushNotifications = (): PushNotificationState => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null,
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.warn("Failed to get push token for push notification");
        return;
      }

      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;

      if (!projectId) {
        console.warn(
          "Project ID not found. Vui lòng chạy lệnh `npx eas-cli init` hoặc thêm projectId vào app.json.",
        );
        return;
      }
      try {
        token = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
        console.log("\n--- EXPO PUSH TOKEN ---");
        console.log(token.data);
        console.log("-----------------------\n");
      } catch (e) {
        console.warn("Lỗi khi lấy Expo Push Token:", e);
      }
    } else {
      console.warn("Must be using a physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("Notification Received in foreground:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response Received (user tapped):", response);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  // Gửi token lên Backend khi có token và đã đăng nhập
  useEffect(() => {
    if (isAuthenticated && expoPushToken?.data) {
      authService
        .saveDeviceToken(expoPushToken.data)
        .then(() => console.log("Đã lưu Device Token lên BE thành công!"))
        .catch((apiError) =>
          console.warn(
            "Không thể lưu token lên BE, hãy kiểm tra API backend:",
            apiError,
          ),
        );
    }
  }, [isAuthenticated, expoPushToken?.data]);

  return {
    expoPushToken,
    notification,
  };
};
