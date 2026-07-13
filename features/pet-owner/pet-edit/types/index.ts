export type PetGender = "female" | "male";

export type GenderOption = {
  value: PetGender;
  label: string;
};

export type { PetEditFormValues } from "@/features/pet-owner/pet-edit/utils/pet-edit.schema";
