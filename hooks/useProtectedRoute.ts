import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { Route, useRouter } from "expo-router";

interface protectRouteFunc {
  callback: Function | undefined;
  fallback: Route;
  params?: any;
}

/**
 * Kiểm tra người dùng đã đăng nhập hay chưa trước khi thực hiện callback.
 *
 * @param callback Hàm sẽ được thực thi khi người dùng đã xác thực.
 * @param fallback Route chuyển hướng tới khi chưa xác thực.
 *
 * @example
 * const protectedRoute = useProtectedRoute();
 *
 * protectedRoute(
 *   () => router.push("/booking"),
 *   "/login"
 * );
 */
export const useProtectedRoute = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const protectedRoute = ({ callback, fallback, params }: protectRouteFunc) => {
    if (!isAuthenticated) {
      router.replace(fallback, params);
      return;
    }

    callback?.();
  };

  return { protectedRoute };
};
