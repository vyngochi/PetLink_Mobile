import api from "@/api/client";
import type { EditProfilePayload } from "@/features/pet-owner/profile/types";

export const profileService = {
  editProfile: (payload: EditProfilePayload) => {
    return api.patch("/mobile/customer/edit-profile", payload);
  },
};
