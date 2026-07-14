import { z } from "zod";

import { OTHER_DISPUTE_REASON } from "@/features/pet-owner/booking-detail/constants/dispute-reasons";

export const bookingDisputeSchema = z
  .object({
    reason: z.string().min(1, "Vui lòng chọn lý do khiếu nại."),
    otherReason: z
      .string()
      .trim()
      .max(200, "Lý do tối đa 200 ký tự.")
      .optional(),
    description: z
      .string()
      .trim()
      .max(1000, "Mô tả tối đa 1000 ký tự.")
      .optional(),
  })
  .refine(
    (data) =>
      data.reason !== OTHER_DISPUTE_REASON ||
      (data.otherReason?.trim().length ?? 0) >= 10,
    {
      message: "Vui lòng nhập lý do khiếu nại, tối thiểu 10 ký tự.",
      path: ["otherReason"],
    },
  )
  .refine((data) => (data.description?.trim().length ?? 0) >= 20, {
    message: "Vui lòng mô tả chi tiết sự việc, tối thiểu 20 ký tự.",
    path: ["description"],
  });

export type BookingDisputeFormValues = z.infer<typeof bookingDisputeSchema>;
