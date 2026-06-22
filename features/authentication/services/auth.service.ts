import api from "@/api/client";
import type { LoginPayload } from "@/features/authentication/login/types";
import type { RegisterPayload } from "@/features/authentication/register/types";

export const authService = {
  login: (payload: LoginPayload) => {
    return api.post("/auth/login", payload);
  },

  register: (payload: RegisterPayload) => {
    return api.post("/auth/register", payload);
  },
};
