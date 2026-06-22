import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "@/features/authentication/stores/auth.store";

/** Read auth state anywhere: `const { isAuthenticated } = useAuth();` */
export const useAuth = () =>
  useAuthStore(
    useShallow((s) => ({
      isAuthenticated: s.isAuthenticated,
      accessToken: s.accessToken,
      hydrating: s.hydrating,
      logout: s.logout,
    })),
  );
