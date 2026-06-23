import { useMutation } from "@tanstack/react-query";

import type {
  LoginPayload,
  LoginResponse,
} from "@/features/authentication/login/types";
import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { toast } from "@/components/toast";
import { unwrapData } from "@/lib/http";

type UseLoginOptions = {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
};

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      const res = await authService.login(payload);
      return unwrapData<LoginResponse>(res);
    },
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data);
      toast.success("Đăng nhập thành công");
      onSuccess?.(data);
    },
    onError,
  });

  return {
    login: mutate,
    isLoggingIn: isPending,
    error,
  };
};
