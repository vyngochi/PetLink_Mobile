import type { AuthTokens } from "@/features/authentication/shared/types";

export type LoginPayload = {
  userName: string;
  password: string;
};

export type LoginResponse = AuthTokens;
