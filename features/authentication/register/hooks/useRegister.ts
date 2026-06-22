import { useMutation } from "@tanstack/react-query";

import type { RegisterPayload } from "@/features/authentication/register/types";
import { authService } from "@/features/authentication/services/auth.service";
import { useAuthStore } from "@/features/authentication/stores/auth.store";
import type { AuthResponse } from "@/features/authentication/types";

type UseRegisterOptions = {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: unknown) => void;
};

export const useRegister = ({ onSuccess, onError }: UseRegisterOptions = {}) => {
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: async (payload: RegisterPayload): Promise<AuthResponse> => {
      const res = await authService.register(payload);
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
    register: mutate,
    registerAsync: mutateAsync,
    isRegistering: isPending,
    error,
  };
};
