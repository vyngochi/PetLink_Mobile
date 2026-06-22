import { useMutation } from "@tanstack/react-query";

import type {
  RegisterPayload,
  RegisterResponse,
} from "@/features/authentication/register/types";
import { authService } from "@/features/authentication/services/auth.service";
import { useAuthStore } from "@/features/authentication/stores/auth.store";
import { unwrapData } from "@/lib/http";

type UseRegisterOptions = {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: unknown) => void;
};

export const useRegister = ({ onSuccess, onError }: UseRegisterOptions = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: RegisterPayload): Promise<RegisterResponse> => {
      const res = await authService.register(payload);
      return unwrapData<RegisterResponse>(res);
    },
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data);
      onSuccess?.(data);
    },
    onError,
  });

  return {
    register: mutate,
    isRegistering: isPending,
    error,
  };
};
