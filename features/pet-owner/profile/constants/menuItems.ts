import { Bell, CreditCard, Heart, LifeBuoy, PawPrint } from "lucide-react-native";

import type { ProfileMenuItem } from "@/features/pet-owner/profile/types";

export const profileMenuItems: ProfileMenuItem[] = [
  {
    key: "my-pets",
    label: "Thú cưng của tôi",
    icon: PawPrint,
    tone: "primary",
    route: "/pet-owner/my-pets",
  },
  {
    key: "favorites",
    label: "Mục Yêu Thích",
    icon: Heart,
    tone: "favorite",
    route: "/pet-owner/favorites",
  },
  {
    key: "payment-methods",
    label: "Phương thức thanh toán",
    icon: CreditCard,
    tone: "secondary",
    route: "/pet-owner/payment-methods",
  },
  {
    key: "notifications",
    label: "Thông báo",
    icon: Bell,
    tone: "tertiary",
  },
  {
    key: "help-support",
    label: "Trợ giúp & Hỗ trợ",
    icon: LifeBuoy,
    tone: "neutral",
  },
];
