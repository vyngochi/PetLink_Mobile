import { useMutation } from "@tanstack/react-query";

import type {
  LoginPayload,
  LoginResponse,
} from "@/features/authentication/login/types";
import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { User } from "@/features/authentication/shared/types";
import { toast } from "@/components/toast";
import { unwrapData } from "@/lib/http";

type UseLoginOptions = {
  onSuccess?: (user: User) => void;
  onError?: (error: unknown) => void;
};

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: LoginPayload): Promise<User> => {
      const loginRes = await authService.login(payload);
      const tokens = unwrapData<LoginResponse>(loginRes);
      useAuthStore.getState().setTokens(tokens);
      try {
        const meRes = await authService.getMe();
        return unwrapData<User>(meRes);
      } catch (meError) {
        useAuthStore.getState().logout();
        throw meError;
      }
    },
    onSuccess: (user) => {
      useAuthStore.getState().setUser(user);
      toast.success("Đăng nhập thành công");
      onSuccess?.(user);
    },
    onError,
  });

  return {
    login: mutate,
    isLoggingIn: isPending,
    error,
  };
};
