import { useMutation } from "@tanstack/react-query";

import type {
  LoginPayload,
  LoginResponse,
} from "@/features/authentication/login/types";
import { authService } from "@/features/authentication/services/auth.service";
import { useAuthStore } from "@/features/authentication/stores/auth.store";

type UseLoginOptions = {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
};

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      const res = await authService.login(payload);
      return res.data.data;
    },
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data);
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });

  return {
    login: mutate,
    loginAsync: mutateAsync,
    isLoggingIn: isPending,
    error,
  };
};
