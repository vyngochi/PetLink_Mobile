import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { useIntendedRoute } from "@/stores/useIntendedRoute";
import { Href } from "expo-router";

interface protectRouteFunc {
  callback: Function | undefined;
  redirect: () => void;
  intendedRoute?: Href;
}

/**
 * Kiểm tra người dùng đã đăng nhập hay chưa trước khi thực hiện callback.
 *
 * @param callback Hàm sẽ được thực thi khi người dùng đã xác thực.
 * @param redirect Hàm chuyển hướng route sang login khi chưa xác thực.
 * @param intendedRoute Props lưu route trước khi chuyển hướng
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
  const { isAuthenticated } = useAuthStore();

  const protectedRoute = ({
    callback,
    redirect,
    intendedRoute,
  }: protectRouteFunc) => {
    if (!isAuthenticated) {
      useIntendedRoute
        .getState()
        .setIntendedRoute(intendedRoute ? intendedRoute : null);
      redirect();
      return;
    }

    callback?.();
  };

  return { protectedRoute };
};
