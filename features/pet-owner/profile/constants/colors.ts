import type { MenuItemTone } from "@/features/pet-owner/profile/types";

export const profileColors = {
  primary: "#006e1c",
  secondary: "#006492",
  tertiary: "#8f4e00",
  outline: "#6f7a6b",
  border: "#becab9",
  error: "#ba1a1a",
  onPrimary: "#ffffff",
  cardShadow: "#0b1c30",
} as const;

export const menuToneStyles: Record<
  MenuItemTone,
  { color: string; bgColor: string }
> = {
  primary: { color: profileColors.primary, bgColor: "#006e1c1f" },
  secondary: { color: profileColors.secondary, bgColor: "#0064921f" },
  tertiary: { color: profileColors.tertiary, bgColor: "#8f4e001f" },
  neutral: { color: profileColors.outline, bgColor: "#6f7a6b1f" },
  favorite: { color: profileColors.error, bgColor: "#ba1a1a1f" },
};
