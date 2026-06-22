import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthTokens } from "@/features/authentication/types";
import { secureStorage } from "@/lib/secure-storage";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  /** True until the persisted state has finished loading from storage. */
  hydrating: boolean;
  setAuth: (tokens: AuthTokens) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hydrating: true,
      setAuth: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken, isAuthenticated: true }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "petlink-auth",
      storage: createJSONStorage(() => secureStorage),
      // Only persist the tokens; derive the rest on load.
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = Boolean(state.accessToken);
          state.hydrating = false;
        }
      },
    },
  ),
);
