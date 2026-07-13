import { useIntendedRoute } from "@/stores/useIntendedRoute";
import { router } from "expo-router";

export const replaceIntended = () => {
  const intendedRoute = useIntendedRoute.getState().intendedRoute;
  intendedRoute && router.replace(intendedRoute ?? "/(tabs)");
  useIntendedRoute.getState().setIntendedRoute(null);
};
