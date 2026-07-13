import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ApiPetDetail } from "@/features/pet-owner/pet-detail/types";
import { petKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { petService } from "@/features/pet-owner/shared/services/pet.service";
import type { CreatePetPayload } from "@/features/pet-owner/shared/types";
import { unwrapData } from "@/lib/http";

export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePetPayload) => {
      const response = await petService.createPet(payload);
      return unwrapData<ApiPetDetail>(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petKeys.lists() });
    },
  });
};
