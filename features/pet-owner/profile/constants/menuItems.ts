import { Bell, CreditCard, LifeBuoy, PawPrint } from "lucide-react-native";

import type { ProfileMenuItem } from "@/features/pet-owner/profile/types";

export const profileMenuItems: ProfileMenuItem[] = [
  {
    key: "my-pets",
    label: "Thú cưng của tôi",
    icon: PawPrint,
    tone: "primary",
  },
  {
    key: "payment-methods",
    label: "Phương thức thanh toán",
    icon: CreditCard,
    tone: "secondary",
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
