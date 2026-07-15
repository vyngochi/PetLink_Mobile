import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { isMobileBlockedRole } from "@/features/authentication/shared/constants/roles";
import { authService } from "@/features/authentication/shared/services/auth.service";
import type { AuthTokens, User } from "@/features/authentication/shared/types";
import { secureStorage } from "@/lib/secure-storage";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  hydrating: boolean;
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
};

let isLoggingOut = false;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      hydrating: true,
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      setUser: (user) => {
        if (isMobileBlockedRole(user.role)) {
          get().logout();
          return;
        }
        set({ user, isAuthenticated: true });
      },
      logout: async () => {
        if (isLoggingOut) return;
        isLoggingOut = true;

        try {
          if (get().isAuthenticated) {
            await authService.removeDeviceToken();
          }
        } catch (error) {
          console.error("Failed to remove device token:", error);
        } finally {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
          });
          isLoggingOut = false;
        }
      },
    }),
    {
      name: "petlink-auth",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          useAuthStore.setState({ hydrating: false });
          return;
        }
        if (state) {
          if (state.user && isMobileBlockedRole(state.user.role)) {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
          }
          state.isAuthenticated = Boolean(state.accessToken && state.user);
          state.hydrating = false;
        }
      },
    },
  ),
);
