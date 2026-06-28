import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { AuthTokens } from "@/features/authentication/shared/types";
import { unwrapData } from "@/lib/http";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    if (config.headers.set) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  pendingQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  pendingQueue = [];
};

const isAuthRoute = (url = "") =>
  url.includes("/auth/login") ||
  url.includes("/auth/register") ||
  url.includes("/auth/refresh");

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Skip intercepting auth routes to prevent loops on login/register/refresh
    if (isAuthRoute(originalRequest.url)) {
      return Promise.reject(error);
    }

    // Check custom header to prevent infinite loops (Axios strips _retry on retry)
    const isRetry =
      originalRequest._retry || originalRequest.headers["x-retry"] === "true";

    if (error.response?.status === 403 && !isRetry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token: string) => {
              originalRequest._retry = true;
              if (originalRequest.headers.set) {
                originalRequest.headers.set("x-retry", "true");
                originalRequest.headers.set("Authorization", `Bearer ${token}`);
              } else {
                originalRequest.headers["x-retry"] = "true";
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      if (originalRequest.headers.set) {
        originalRequest.headers.set("x-retry", "true");
      } else {
        originalRequest.headers["x-retry"] = "true";
      }
      isRefreshing = true;

      const { accessToken, refreshToken, setTokens, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${baseURL || ""}/auth/refresh-token`,
          { refreshToken },
          {
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const tokens = unwrapData<AuthTokens>(response);

        setTokens(tokens);

        if (originalRequest.headers.set) {
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${tokens.accessToken}`,
          );
        } else {
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }

        processQueue(null, tokens.accessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Log out user only if refresh token is rejected due to auth error (4xx)
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          if (status && status >= 400 && status < 500) {
            logout();
          }
        } else {
          logout();
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
