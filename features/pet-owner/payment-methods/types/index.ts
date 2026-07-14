import type { LucideIcon } from "lucide-react-native";
import type { ImageSourcePropType } from "react-native";

export type PaymentMethodId = "cash" | "momo";

export type PaymentMethod = {
  id: PaymentMethodId;
  name: string;
  icon?: LucideIcon;
  image?: ImageSourcePropType;
  iconBgClass?: string;
  isEnabled: boolean;
};
