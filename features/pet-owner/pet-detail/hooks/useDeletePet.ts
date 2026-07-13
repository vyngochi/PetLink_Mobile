import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petKeys } from "@/features/pet-owner/shared/constants/query-keys";
import { petService } from "@/features/pet-owner/shared/services/pet.service";

export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: string) => petService.deletePet(petId),
    onSuccess: (_result, petId) => {
      queryClient.removeQueries({ queryKey: petKeys.detail(petId) });
      queryClient.invalidateQueries({ queryKey: petKeys.lists() });
    },
  });
};
