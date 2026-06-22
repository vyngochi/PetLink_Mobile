import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/features/authentication/stores/auth.store";
import type { AuthTokens } from "@/features/authentication/types";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (__DEV__) {
    console.log(
      `[API →] ${config.method?.toUpperCase()} ${config.baseURL ?? ""}${config.url ?? ""}`,
      config.data ?? "",
    );
  }
  return config;
});

/**
 * Single-flight token refresh: while one refresh is in progress, other 401s
 * wait in this queue instead of each firing their own refresh request.
 */
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

// Auth endpoints must never trigger the refresh-and-retry loop themselves.
const isAuthRoute = (url = "") =>
  url.includes("/auth/login") ||
  url.includes("/auth/register") ||
  url.includes("/auth/refresh");

/**
 * Refresh with a bare axios call so it bypasses these interceptors — otherwise
 * a 401 on the refresh request would recurse back into this handler.
 */
const requestRefreshedTokens = async (
  refreshToken: string,
): Promise<AuthTokens> => {
  const res = await axios.post(
    `${process.env.EXPO_PUBLIC_BASE_URL ?? ""}/auth/refresh`,
    { refreshToken },
    { timeout: 10000 },
  );
  return res.data.data as AuthTokens;
};

api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(
        `[API ←] ${response.status} ${response.config.url ?? ""}`,
        response.data,
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    if (__DEV__) {
      if (error.response) {
        console.log(
          `[API ✕] ${error.response.status} ${error.config?.url ?? ""}`,
          error.response.data,
        );
      } else {
        console.log(
          `[API ✕] no response ${error.config?.url ?? ""}`,
          error.message,
        );
      }
    }

    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const { refreshToken, setAuth, logout } = useAuthStore.getState();

    const shouldRefresh =
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !isAuthRoute(original.url) &&
      Boolean(refreshToken);

    if (!shouldRefresh || !original) {
      return Promise.reject(error);
    }

    // A refresh is already running: queue this request until it resolves.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token) => {
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
      setAuth(tokens);
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
