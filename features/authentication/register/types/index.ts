import type { AuthTokens } from "@/features/authentication/shared/types";

export type RegisterPayload = {
  userName: string;
  password: string;
  email: string;
  phone: string;
};

export type RegisterResponse = AuthTokens;
