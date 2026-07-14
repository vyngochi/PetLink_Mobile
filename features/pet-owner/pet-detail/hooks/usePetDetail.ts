import type {
  ApiPetDetail,
  PetDetail,
  PetDetailStatus,
} from "@/features/pet-owner/pet-detail/types";
import { petKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { petService } from "@/features/pet-owner/shared/services/pet.service";
import { unwrapData } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

const toPetDetailStatus = (status: string): PetDetailStatus =>
  status.toLowerCase() === "active" ? "active" : "inactive";

const toPetDetail = (pet: ApiPetDetail): PetDetail => ({
  ...pet,
  status: toPetDetailStatus(pet.status),
  criticalNote: pet.criticalNote ?? undefined,
  healthReminder: pet.healthReminder ?? undefined,
  medicalRecords: pet.medicalRecords ?? [],
  photos: pet.photos ?? [],
});

export const usePetDetail = (petId: string) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: petKeys.detail(petId),
    queryFn: async () => {
      const response = await petService.getPetDetail(petId);
      return unwrapData<ApiPetDetail>(response);
    },
    select: toPetDetail,
    enabled: Boolean(petId),
  });

  return {
    pet: data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};
