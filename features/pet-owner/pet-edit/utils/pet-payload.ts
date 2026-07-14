import { GENDER_OPTIONS } from "@/features/pet-owner/pet-edit/constants/gender";
import type { PetGender } from "@/features/pet-owner/pet-edit/types";
import type { PetFormValues } from "@/features/pet-owner/pet-edit/utils/pet-form.schema";
import type { CreatePetPayload } from "@/features/pet-owner/shared/types";

const toGenderLabel = (gender: PetGender) =>
  GENDER_OPTIONS.find((option) => option.value === gender)?.label ?? "";

export const toPetPayload = (
  values: PetFormValues,
  photos: string[],
): CreatePetPayload => ({
  name: values.name,
  breed: values.breed,
  gender: toGenderLabel(values.gender),
  ageLabel: values.ageLabel,
  imageUrl: values.imageUrl,
  weight: `${values.weight} kg`,
  height: `${values.height} cm`,
  color: values.color,
  criticalNote: values.medicalNotes.length > 0 ? values.medicalNotes : null,
  photos,
});
