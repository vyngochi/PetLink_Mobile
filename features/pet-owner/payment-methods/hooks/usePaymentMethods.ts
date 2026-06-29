import {
  otherPaymentMethods,
  paymentCards,
} from "@/features/pet-owner/payment-methods/constants/paymentMethods";
import type {
  OtherPaymentMethod,
  PaymentCard,
} from "@/features/pet-owner/payment-methods/types";

export function usePaymentMethods(): {
  cards: PaymentCard[];
  otherMethods: OtherPaymentMethod[];
} {
  return { cards: paymentCards, otherMethods: otherPaymentMethods };
}
