import type { LucideIcon } from "lucide-react-native";

export type CardBrand = "visa" | "mastercard" | "generic";

export type PaymentCard = {
  id: string;
  brand: CardBrand;
  last4: string;
  expiry: string;
  isPrimary: boolean;
};

export type OtherPaymentMethod = {
  id: string;
  name: string;
  icon: LucideIcon;
  iconBgClass: string;
};
