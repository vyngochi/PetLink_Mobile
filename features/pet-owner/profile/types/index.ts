import type { LucideIcon } from "lucide-react-native";

export type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  verified?: boolean;
};

export type EditProfilePayload = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
};

export type MenuItemTone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "favorite";

export type ProfileMenuItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  tone: MenuItemTone;
  route?: string;
};
