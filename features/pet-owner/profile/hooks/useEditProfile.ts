import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/toast";
import { profileService } from "@/features/pet-owner/profile/services/profile.service";
import type { EditProfilePayload } from "@/features/pet-owner/profile/types";

type UseEditProfileOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const useEditProfile = ({
  onSuccess,
  onError,
}: UseEditProfileOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: EditProfilePayload) =>
      profileService.editProfile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Cập nhật hồ sơ thành công", {
        position: "bottom",
        duration: 600,
      });

      onSuccess?.();
    },
    onError,
  });

  return { editProfile: mutate, isSaving: isPending, error };
};
