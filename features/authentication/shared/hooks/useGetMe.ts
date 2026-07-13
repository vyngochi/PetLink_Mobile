import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";
import { User } from "../types";

export const useGetMe = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await authService.getMe();
      return unwrapData<User>(response);
    },
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (query.data) {
      useAuthStore.getState().setUser(query.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (!query.error) return;
    const status = axios.isAxiosError(query.error)
      ? query.error.response?.status
      : undefined;
    if (status === 401) {
      useAuthStore.getState().logout();
    }
  }, [query.error]);

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
