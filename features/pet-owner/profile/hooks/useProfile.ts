import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import type { UserProfile } from "@/features/pet-owner/profile/types";

export function useProfile(): { profile: UserProfile } {
  const user = useAuthStore((state) => state.user);

  const profile: UserProfile = {
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    location: "",
    avatarUrl: user?.avatar ?? undefined,
  };

  return { profile };
}
