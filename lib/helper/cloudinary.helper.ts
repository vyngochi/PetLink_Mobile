import { PixelRatio } from "react-native";

const CLOUDINARY_BASE_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;

const CLOUDINARY_HOST = "res.cloudinary.com";
const UPLOAD_SEGMENT = "/upload/";
const ABSOLUTE_PREFIXES = ["http://", "https://", "data:", "blob:", "file:"];

export type ImageTransform = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "thumb";
};

const isAbsolute = (value: string) =>
  ABSOLUTE_PREFIXES.some((prefix) => value.startsWith(prefix));

const toPixels = (size: number) => Math.round(PixelRatio.getPixelSizeForLayoutSize(size));

const buildTransform = ({ width, height, crop = "fill" }: ImageTransform) => {
  const params = ["f_auto", "q_auto"];

  if (width) params.push(`w_${toPixels(width)}`);
  if (height) params.push(`h_${toPixels(height)}`);
  if (width || height) params.push(`c_${crop}`);

  return params.join(",");
};

const withTransform = (url: string, transform: ImageTransform) => {
  const uploadIndex = url.indexOf(UPLOAD_SEGMENT);
  if (!url.includes(CLOUDINARY_HOST) || uploadIndex === -1) return url;

  const splitAt = uploadIndex + UPLOAD_SEGMENT.length;
  return `${url.slice(0, splitAt)}${buildTransform(transform)}/${url.slice(splitAt)}`;
};

export const getImageUrl = (
  value?: string | null,
  transform?: ImageTransform,
): string | undefined => {
  const raw = value?.trim();
  if (!raw) return undefined;

  if (isAbsolute(raw)) {
    return transform ? withTransform(raw, transform) : raw;
  }

  if (!CLOUDINARY_BASE_URL) {
    if (__DEV__) {
      console.warn(
        "[getImageUrl] Thiếu EXPO_PUBLIC_CLOUDINARY_URL, không dựng được URL ảnh cho:",
        raw,
      );
    }
    return undefined;
  }

  const base = CLOUDINARY_BASE_URL.replace(/\/+$/, "");
  const path = raw.replace(/^\/+/, "");
  const params = transform ? `${buildTransform(transform)}/` : "";

  return `${base}/${params}${path}`;
};
