import { z } from "zod";

const CARD_NUMBER_REGEX = /^\d{16}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_REGEX = /^\d{3,4}$/;

export const addPaymentMethodSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số thẻ.")
    .refine(
      (value) => CARD_NUMBER_REGEX.test(value.replace(/\s/g, "")),
      "Số thẻ phải gồm 16 chữ số.",
    ),
  cardName: z.string().trim().min(1, "Vui lòng nhập tên chủ thẻ."),
  expiry: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập ngày hết hạn.")
    .regex(EXPIRY_REGEX, "Định dạng phải là MM/YY."),
  cvv: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập CVV.")
    .regex(CVV_REGEX, "CVV gồm 3 hoặc 4 chữ số."),
  saveCard: z.boolean(),
});

export type AddPaymentMethodFormValues = z.infer<typeof addPaymentMethodSchema>;
