import { Route, useRouter } from "expo-router";

interface protectRouteFunc {
  callback: Function;
  fallback: Route;
}

export const useProtectedRoute = () => {
  const router = useRouter();
  const isAuthenticated = false; // store

  const protectedRoute = ({ callback, fallback }: protectRouteFunc) => {
    if (!isAuthenticated) {
      router.replace(fallback);
      return;
    }

    callback();
  };

  return { protectedRoute };
};
