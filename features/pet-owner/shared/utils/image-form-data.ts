const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
};

export const isLocalImageUri = (value?: string | null) =>
  Boolean(value?.startsWith("file://"));

const getFileName = (uri: string, fallbackName: string) => {
  const lastSegment = uri.split("/").pop() ?? "";
  const fileName = lastSegment.split("?")[0];
  return fileName.length > 0 ? fileName : fallbackName;
};

const getMimeType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return MIME_TYPES[extension] ?? "image/jpeg";
};

export const appendImageFile = (
  formData: FormData,
  field: string,
  uri: string,
  fallbackName = "photo.jpg",
) => {
  const name = getFileName(uri, fallbackName);
  formData.append(field, {
    uri,
    name,
    type: getMimeType(name),
  } as unknown as Blob);
};
