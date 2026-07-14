export type PetGender = "female" | "male";

export type GenderOption = {
  value: PetGender;
  label: string;
};

export type { PetFormValues } from "@/features/pet-owner/pet-edit/utils/pet-form.schema";
