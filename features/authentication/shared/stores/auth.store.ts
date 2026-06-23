import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      hydrating: true,
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
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
          state.isAuthenticated = Boolean(state.accessToken && state.user);
          state.hydrating = false;
        }
      },
    },
  ),
);
