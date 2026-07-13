import { useIntendedRoute } from "@/stores/useIntendedRoute";
import { router } from "expo-router";

export const replaceIntended = () => {
  const { intendedRoute, setIntendedRoute } = useIntendedRoute.getState();
  router.replace(intendedRoute ?? "/(tabs)");
  setIntendedRoute(null);
};
