import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/toast";
import type {
  RegisterPayload,
  RegisterResponse,
} from "@/features/authentication/register/types";
import { authService } from "@/features/authentication/shared/services/auth.service";
import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { User } from "@/features/authentication/shared/types";
import { unwrapData } from "@/lib/http";
import { useIntendedRoute } from "@/stores/useIntendedRoute";
import { router } from "expo-router";

type UseRegisterOptions = {
  onSuccess?: (user: User) => void;
  onError?: (error: unknown) => void;
};

export const useRegister = ({ onError }: UseRegisterOptions = {}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const registerRes = await authService.register(payload);
      return unwrapData<RegisterResponse>(registerRes);
    },
    onSuccess: async (data) => {
      useAuthStore.getState().setTokens(data);

      await queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Đăng ký thành công", {
        position: "bottom",
        duration: 600,
      });

      const intendedRoute = useIntendedRoute.getState().intendedRoute;
      intendedRoute && router.replace(intendedRoute);
      useIntendedRoute.getState().setIntendedRoute(null);
    },
    onError,
  });

  return {
    register: mutate,
    isRegistering: isPending,
    error,
  };
};
