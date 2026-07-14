import { z } from "zod";

export const bookingReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Vui lòng chọn số sao đánh giá.")
    .max(5, "Vui lòng chọn số sao đánh giá."),
  comment: z
    .string()
    .trim()
    .max(1000, "Nhận xét tối đa 1000 ký tự.")
    .optional(),
});

export type BookingReviewFormValues = z.infer<typeof bookingReviewSchema>;
