import { z } from "zod";

import { OTHER_CANCEL_REASON } from "@/features/pet-owner/bookings/constants/cancel-reasons";

export const bookingCancelSchema = z
  .object({
    reason: z.string().min(1, "Vui lòng chọn lý do hủy lịch."),
    otherReason: z
      .string()
      .trim()
      .max(300, "Lý do tối đa 300 ký tự.")
      .optional(),
  })
  .refine(
    (data) =>
      data.reason !== OTHER_CANCEL_REASON ||
      (data.otherReason?.trim().length ?? 0) >= 10,
    {
      message: "Vui lòng nhập lý do hủy, tối thiểu 10 ký tự.",
      path: ["otherReason"],
    },
  );

export type BookingCancelFormValues = z.infer<typeof bookingCancelSchema>;
