import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/toast";
import type {
  LoginPayload,
  LoginResponse,
} from "@/features/authentication/login/types";
import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { User } from "@/features/authentication/shared/types";
import { replaceIntended } from "@/lib/helper/replace-intended.helper";
import { unwrapData } from "@/lib/http";

type UseLoginOptions = {
  onSuccess?: (user: User) => void;
  onError?: (error: unknown) => void;
};

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const loginRes = await authService.login(payload);
      return unwrapData<LoginResponse>(loginRes);
    },
    onSuccess: async (data) => {
      useAuthStore.getState().setTokens(data);

      try {
        const userRes = await authService.getMe();
        const user = unwrapData<User>(userRes);
        useAuthStore.getState().setUser(user);
        
        await queryClient.invalidateQueries({
          queryKey: ["me"],
        });

        onSuccess?.(user);
      } catch (err) {
        console.error("Failed to fetch user after login", err);
      }

      toast.success("Đăng nhập thành công", {
        position: "bottom",
        duration: 600,
      });

      replaceIntended();
    },
    onError,
  });

  return {
    login: mutate,
    isLoggingIn: isPending,
    error,
  };
};
