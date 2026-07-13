import api from "@/api/client";
import type { EditProfilePayload } from "@/features/pet-owner/profile/types";
import { buildEditProfileFormData } from "@/features/pet-owner/profile/utils/edit-profile-form-data";
import { isLocalImageUri } from "@/features/pet-owner/shared/utils/image-form-data";

const UPLOAD_TIMEOUT_MS = 60000;

export const profileService = {
  editProfile: (payload: EditProfilePayload) => {
    if (isLocalImageUri(payload.avatarUri)) {
      return api.patch(
        "/mobile/customer/edit-profile",
        buildEditProfileFormData(payload),
        { timeout: UPLOAD_TIMEOUT_MS },
      );
    }

    const { fullName, phone, location } = payload;
    return api.patch("/mobile/customer/edit-profile", {
      fullName,
      phone,
      location,
    });
  },
};
