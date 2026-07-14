import type { UpdatePetPayload } from "@/features/pet-owner/shared/types";
import {
  appendImageFile,
  isLocalImageUri,
} from "@/features/pet-owner/shared/utils/image-form-data";


const TEXT_FIELDS = [
  "name",
  "breed",
  "gender",
  "ageLabel",
  "weight",
  "height",
  "color",
  "status",
] as const;

const HANDLED_FIELDS = new Set<string>([
  ...TEXT_FIELDS,
  "imageUrl",
  "criticalNote",
  "photos",
]);

export const hasLocalImages = (payload: UpdatePetPayload) =>
  isLocalImageUri(payload.imageUrl) ||
  (payload.photos?.some(isLocalImageUri) ?? false);

const appendFile = (formData: FormData, field: string, uri: string) =>
  appendImageFile(formData, field, uri, "pet-photo.jpg");

export const buildPetFormData = (payload: UpdatePetPayload) => {
  if (__DEV__) {
    Object.keys(payload)
      .filter((field) => !HANDLED_FIELDS.has(field))
      .forEach((field) => {
        console.warn(
          `[buildPetFormData] Field "${field}" chưa được hỗ trợ khi gửi kèm ảnh, sẽ bị bỏ qua.`,
        );
      });
  }

  const formData = new FormData();

  TEXT_FIELDS.forEach((field) => {
    const value = payload[field];
    if (value !== undefined) {
      formData.append(field, value);
    }
  });

  if (payload.criticalNote !== undefined) {
    formData.append("criticalNote", payload.criticalNote ?? "");
  }

  if (payload.photos !== undefined) {
    const uploadedPhotos = payload.photos.filter(
      (photo) => !isLocalImageUri(photo),
    );
    formData.append("photos", JSON.stringify(uploadedPhotos));

    payload.photos
      .filter(isLocalImageUri)
      .forEach((photo) => appendFile(formData, "photos", photo));
  }

  if (payload.imageUrl !== undefined) {
    if (isLocalImageUri(payload.imageUrl)) {
      appendFile(formData, "imageUrl", payload.imageUrl);
    } else {
      formData.append("imageUrl", payload.imageUrl);
    }
  }

  return formData;
};
