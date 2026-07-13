import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ApiPetDetail } from "@/features/pet-owner/pet-detail/types";
import { petKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { petService } from "@/features/pet-owner/shared/services/pet.service";
import type { UpdatePetPayload } from "@/features/pet-owner/shared/types";
import { unwrapData } from "@/lib/http";

type UpdatePetVariables = {
  petId: string;
  payload: UpdatePetPayload;
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ petId, payload }: UpdatePetVariables) => {
      const response = await petService.updatePet(petId, payload);
      return unwrapData<ApiPetDetail>(response);
    },
    onSuccess: (_pet, { petId }) => {
      queryClient.invalidateQueries({ queryKey: petKeys.lists() });
      queryClient.invalidateQueries({ queryKey: petKeys.detail(petId) });
    },
  });
};
