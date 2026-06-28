import { z } from "zod";

const PHONE_REGEX = /^0\d{9}$/;

export const registerSchema = z
  .object({
    userName: z.string().trim().min(1, "Vui lòng nhập tên đăng nhập."),
    email: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập email.")
      .pipe(z.email("Email không hợp lệ.")),
    phone: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập số điện thoại.")
      .regex(PHONE_REGEX, "Số điện thoại phải gồm 10 số và bắt đầu bằng 0."),
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
