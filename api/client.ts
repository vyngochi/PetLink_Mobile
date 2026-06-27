import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { AuthTokens } from "@/features/authentication/shared/types";
import { unwrapData } from "@/lib/http";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const flushQueue = (error: unknown, token: string | null) => {
  pendingQueue.forEach((p) => {
    if (token) p.resolve(token);
    else p.reject(error);
  });
  pendingQueue = [];
};

const isAuthRoute = (url = "") =>
  url.includes("/auth/login") ||
  url.includes("/auth/register") ||
  url.includes("/auth/refresh");

const requestRefreshedTokens = async (
  refreshToken: string,
): Promise<AuthTokens> => {
  const res = await axios.post(
    `${process.env.EXPO_PUBLIC_BASE_URL ?? ""}/auth/refresh`,
    { refreshToken },
    { timeout: 10000 },
  );
  return unwrapData<AuthTokens>(res);
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const { refreshToken, setTokens, logout } = useAuthStore.getState();

    const is401 = error.response?.status === 401;
    const onAuthRoute = isAuthRoute(original?.url);
    const shouldRefresh =
      is401 &&
      Boolean(original) &&
      !original?._retry &&
      !onAuthRoute &&
      Boolean(refreshToken);

    if (!shouldRefresh || !original) {
      if (is401 && !onAuthRoute) {
        logout();
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token) => {
            original._retry = true;
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    original._retry = true;
    isRefreshing = true;
    try {
      const tokens = await requestRefreshedTokens(refreshToken as string);
      setTokens(tokens);
      flushQueue(null, tokens.accessToken);
      original.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return api(original);
    } catch (refreshError) {
      flushQueue(refreshError, null);
      logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
