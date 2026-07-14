import { Banknote } from "lucide-react-native";

import type { PaymentMethod } from "@/features/pet-owner/payment-methods/types";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "cash",
    name: "Tiền mặt",
    icon: Banknote,
    iconBgClass: "bg-[#22c55e]",
    isEnabled: true,
  },
  {
    id: "momo",
    name: "Ví MoMo",
    image: require("@/assets/images/PaymentLogo/Momo.webp"),
    iconBgClass: "bg-[#a50064]",
    isEnabled: false,
  },
];
