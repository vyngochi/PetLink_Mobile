import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/toast";
import type {
  RegisterPayload,
  RegisterResponse,
} from "@/features/authentication/register/types";
import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { User } from "@/features/authentication/shared/types";
import { unwrapData } from "@/lib/http";

type UseRegisterOptions = {
  onSuccess?: (user: User) => void;
  onError?: (error: unknown) => void;
};

export const useRegister = ({
  onSuccess,
  onError,
}: UseRegisterOptions = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: RegisterPayload): Promise<User> => {
      const registerRes = await authService.register(payload);
      const tokens = unwrapData<RegisterResponse>(registerRes);
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
      toast.success("Đăng ký thành công", {
        position: "bottom",
        duration: 600,
      });
      onSuccess?.(user);
    },
    onError,
  });

  return {
    register: mutate,
    isRegistering: isPending,
    error,
  };
};
