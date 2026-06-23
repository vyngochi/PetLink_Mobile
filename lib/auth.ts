import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";

export const useAuth = () =>
  useAuthStore(
    useShallow((s) => ({
      isAuthenticated: s.isAuthenticated,
      accessToken: s.accessToken,
      user: s.user,
      hydrating: s.hydrating,
      logout: s.logout,
    })),
  );
