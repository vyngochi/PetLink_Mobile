import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

const MAX_UPLOAD_DIMENSION = 1600;
const UPLOAD_COMPRESS_QUALITY = 0.8;
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const UPLOADABLE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const IMAGE_PERMISSION_MESSAGE =
  "Cần cấp quyền truy cập thư viện ảnh để chọn ảnh.";
export const IMAGE_PROCESSING_MESSAGE =
  "Không xử lý được ảnh đã chọn. Vui lòng thử ảnh khác.";

export type PickImagesResult =
  | { status: "success"; uris: string[] }
  | { status: "canceled" }
  | { status: "error"; message: string };

type PickImagesOptions = {
  selectionLimit?: number;
  allowsEditing?: boolean;
};

const resizeWithinLimit = (asset: ImagePicker.ImagePickerAsset) => {
  const context = ImageManipulator.manipulate(asset.uri);
  const longestEdge = Math.max(asset.width, asset.height);

  if (longestEdge <= MAX_UPLOAD_DIMENSION) {
    return context;
  }

  return context.resize(
    asset.width >= asset.height
      ? { width: MAX_UPLOAD_DIMENSION }
      : { height: MAX_UPLOAD_DIMENSION },
  );
};

const isUploadableAsIs = (asset: ImagePicker.ImagePickerAsset) => {
  const mimeType = asset.mimeType ?? "";
  const isUnsupportedType =
    mimeType.length > 0 && !UPLOADABLE_MIME_TYPES.includes(mimeType);

  return !isUnsupportedType && (asset.fileSize ?? 0) <= MAX_UPLOAD_BYTES;
};

const prepareForUpload = async (asset: ImagePicker.ImagePickerAsset) => {
  try {
    const rendered = await resizeWithinLimit(asset).renderAsync();
    const compressed = await rendered.saveAsync({
      compress: UPLOAD_COMPRESS_QUALITY,
      format: SaveFormat.JPEG,
    });

    return compressed.uri;
  } catch {
    return isUploadableAsIs(asset) ? asset.uri : null;
  }
};

export const pickImages = async ({
  selectionLimit = 1,
  allowsEditing = false,
}: PickImagesOptions = {}): Promise<PickImagesResult> => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    return { status: "error", message: IMAGE_PERMISSION_MESSAGE };
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsMultipleSelection: selectionLimit > 1,
    selectionLimit,
    allowsEditing,
    aspect: allowsEditing ? [1, 1] : undefined,
    quality: 0.8,
  });

  if (result.canceled) {
    return { status: "canceled" };
  }

  const prepared = await Promise.all(result.assets.map(prepareForUpload));
  const uris = prepared.filter((uri): uri is string => uri !== null);

  if (uris.length === 0) {
    return { status: "error", message: IMAGE_PROCESSING_MESSAGE };
  }

  return { status: "success", uris };
};
