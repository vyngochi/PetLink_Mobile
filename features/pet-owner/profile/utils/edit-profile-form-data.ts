import type { EditProfilePayload } from "@/features/pet-owner/profile/types";
import {
  appendImageFile,
  isLocalImageUri,
} from "@/features/pet-owner/shared/utils/image-form-data";

export const buildEditProfileFormData = (payload: EditProfilePayload) => {
  const formData = new FormData();

  formData.append("fullName", payload.fullName);
  formData.append("phone", payload.phone);

  if (payload.location !== undefined) {
    formData.append("location", payload.location);
  }

  if (payload.avatarUri && isLocalImageUri(payload.avatarUri)) {
    appendImageFile(formData, "avatar", payload.avatarUri, "avatar.jpg");
  }

  return formData;
};
