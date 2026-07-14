import api from "@/api/client";
import { type LoginPayload } from "@/features/authentication/login/types";
import type { RegisterPayload } from "@/features/authentication/register/types";

export const authService = {
  login: (payload: LoginPayload) => {
    return api.post("/auth/login", payload);
  },

  register: (payload: RegisterPayload) => {
    return api.post("/auth/register", payload);
  },

  getMe: () => {
    return api.get("/auth/get-info", {
      headers: { "Cache-Control": "no-store", Pragma: "no-cache" },
    });
  },

  saveDeviceToken: (token: string) => {
    return api.post("/mobile/users/device-token", { token });
  },

  removeDeviceToken: () => {
    return api.delete("/mobile/users/device-token");
  },
};
