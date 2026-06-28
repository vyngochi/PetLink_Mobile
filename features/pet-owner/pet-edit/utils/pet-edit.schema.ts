import { z } from "zod";

const NUMBER_REGEX = /^\d+(\.\d+)?$/;

export const petEditSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên thú cưng."),
  breed: z.string().trim().min(1, "Vui lòng nhập giống loài."),
  gender: z.enum(["female", "male"]),
  ageLabel: z.string().trim().min(1, "Vui lòng nhập độ tuổi."),
  weight: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập cân nặng.")
    .regex(NUMBER_REGEX, "Cân nặng phải là số hợp lệ."),
  height: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập chiều cao.")
    .regex(NUMBER_REGEX, "Chiều cao phải là số hợp lệ."),
  color: z.string().trim().min(1, "Vui lòng nhập màu sắc."),
  medicalNotes: z.string().trim().max(500, "Ghi chú y tế tối đa 500 ký tự."),
});

export type PetEditFormValues = z.infer<typeof petEditSchema>;
