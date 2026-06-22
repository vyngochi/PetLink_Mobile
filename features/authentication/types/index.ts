export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

/** Both login and register return the same auth token pair. */
export type AuthResponse = AuthTokens;
