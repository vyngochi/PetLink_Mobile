import { Apple, Smartphone, Wallet } from "lucide-react-native";

import type {
  OtherPaymentMethod,
  PaymentCard,
} from "@/features/pet-owner/payment-methods/types";

export const paymentCards: PaymentCard[] = [
  {
    id: "card-4242",
    brand: "visa",
    last4: "4242",
    expiry: "12/26",
    isPrimary: true,
  },
  {
    id: "card-8812",
    brand: "mastercard",
    last4: "8812",
    expiry: "08/25",
    isPrimary: false,
  },
];

export const otherPaymentMethods: OtherPaymentMethod[] = [
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: Apple,
    iconBgClass: "bg-foreground",
  },
  {
    id: "zalopay",
    name: "Ví ZaloPay",
    icon: Wallet,
    iconBgClass: "bg-[#0068ff]",
  },
  {
    id: "momo",
    name: "Ví MoMo",
    icon: Smartphone,
    iconBgClass: "bg-[#a50064]",
  },
];
