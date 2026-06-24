import { myPets } from "@/features/pet-owner/my-pets/constants/pets";
import type { Pet } from "@/features/pet-owner/my-pets/types";

export function usePets(): { pets: Pet[] } {
  return { pets: myPets };
}
