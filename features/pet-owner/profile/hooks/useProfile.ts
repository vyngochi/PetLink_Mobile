import type { UserProfile } from "@/features/pet-owner/profile/types";

export function useProfile(): { profile: UserProfile } {
  const profile: UserProfile = {
    fullName: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+84 901 234 567",
    location: "Hà Nội, Việt Nam",
    avatarUrl: "https://i.pravatar.cc/300?img=47",
    verified: true,
  };

  return { profile };
}
