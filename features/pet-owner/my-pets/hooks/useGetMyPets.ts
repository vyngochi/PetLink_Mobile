import { petKeys } from "@/features/pet-owner/my-pets/constants/query-keys";
import { petService } from "@/features/pet-owner/my-pets/services/pet.service";
import type {
  ApiPet,
  MyPetsResponse,
  Pet,
  PetStatus,
} from "@/features/pet-owner/my-pets/types";
import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

const toPetStatus = (status: string): PetStatus =>
  status.toLowerCase() === "active" ? "active" : "inactive";

const toPet = (pet: ApiPet): Pet => ({
  ...pet,
  status: toPetStatus(pet.status),
  nextVaccineDate: pet.nextVaccineDate ?? null,
});

export const useGetMyPets = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: petKeys.myPets(),
    queryFn: async () => {
      const response = await petService.getMyPets();
      return unwrapData<MyPetsResponse>(response);
    },
    select: (result) => ({
      pets: result.pets.map(toPet),
      total: result.total,
    }),
  });

  return {
    pets: data?.pets ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
