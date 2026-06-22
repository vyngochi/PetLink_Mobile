import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { useAuth } from "@/lib/auth";
import QueryProvider from "@/provider/QueryProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { loaded, error } = useLoadFonts();
  const { isAuthenticated, hydrating } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const fontsReady = loaded || error;
  const ready = fontsReady && !hydrating;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const inAuthGroup = segments[0] === "(auth)";
    const inProtectedGroup = segments[0] === "pet-owner";
    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!isAuthenticated && inProtectedGroup) {
      router.replace("/login");
    }
  }, [ready, isAuthenticated, segments, router]);

  if (!ready) {
    return null;
  }

  return (
    <QueryProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="pet-owner" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
        <PortalHost />
      </ThemeProvider>
    </QueryProvider>
  );
}
