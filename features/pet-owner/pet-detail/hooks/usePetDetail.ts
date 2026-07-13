import { petDetails } from "@/features/pet-owner/pet-detail/constants/pet-detail-mock";
import type { PetDetail } from "@/features/pet-owner/pet-detail/types";

export function usePetDetail(petId: string): { pet: PetDetail | undefined } {
  return { pet: petDetails.find((pet) => pet.id === petId) };
}
