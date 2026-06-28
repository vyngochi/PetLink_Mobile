import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { AuthTokens } from "@/features/authentication/shared/types";
import { unwrapData } from "@/lib/http";
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const api = axios.create({ baseURL, timeout: 10000 });
export const refreshApi = axios.create({ baseURL, timeout: 10000 });

const injectTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(injectTokenInterceptor);
refreshApi.interceptors.request.use(injectTokenInterceptor);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const isAuthRoute = (url = "") =>
  /\/auth\/(login|register|refresh)(\/|\?|$)/.test(url);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest || isAuthRoute(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest._retry = true;
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const response = await refreshApi.post("/auth/refresh-token", {
          refreshToken,
        });
        const tokens = unwrapData<AuthTokens>(response);

        setTokens(tokens);

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        processQueue(null, tokens.accessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        const status = axios.isAxiosError(err) ? err.response?.status : null;
        if (!status || (status >= 400 && status < 500)) {
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
