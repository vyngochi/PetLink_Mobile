import type { UpdatePetPayload } from "@/features/pet-owner/shared/types";

const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
};

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

export const isLocalImageUri = (value?: string | null) =>
  Boolean(value?.startsWith("file://"));

export const hasLocalImages = (payload: UpdatePetPayload) =>
  isLocalImageUri(payload.imageUrl) ||
  (payload.photos?.some(isLocalImageUri) ?? false);

const getFileName = (uri: string) => {
  const lastSegment = uri.split("/").pop() ?? "";
  const fileName = lastSegment.split("?")[0];
  return fileName.length > 0 ? fileName : "pet-photo.jpg";
};

const getMimeType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return MIME_TYPES[extension] ?? "image/jpeg";
};

const appendFile = (formData: FormData, field: string, uri: string) => {
  const name = getFileName(uri);
  formData.append(field, {
    uri,
    name,
    type: getMimeType(name),
  } as unknown as Blob);
};

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
