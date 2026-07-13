import { z } from "zod";

const PHONE_REGEX = /^0\d{9}$/;

export const editProfileSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(PHONE_REGEX, "Số điện thoại phải gồm 10 số và bắt đầu bằng 0."),
  location: z.string().trim().optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
