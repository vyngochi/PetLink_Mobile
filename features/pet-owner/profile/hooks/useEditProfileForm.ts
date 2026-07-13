import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { toast } from "@/components/toast";
import { useFieldErrors } from "@/features/authentication/shared/hooks/useFieldErrors";
import { EDIT_PROFILE_ERROR_MESSAGES } from "@/features/pet-owner/profile/constants/edit-profile-error-messages";
import { useEditProfile } from "@/features/pet-owner/profile/hooks/useEditProfile";
import type { UserProfile } from "@/features/pet-owner/profile/types";
import {
  editProfileSchema,
  type EditProfileFormValues,
} from "@/features/pet-owner/profile/utils/edit-profile.schema";
import { getApiErrorMessage } from "@/lib/http";
import { validate } from "@/lib/validation";

type UseEditProfileFormOptions = {
  initial: UserProfile;
  onSuccess?: () => void;
};

export function useEditProfileForm({
  initial,
  onSuccess,
}: UseEditProfileFormOptions) {
  const [fullName, setFullName] = useState(initial.fullName);
  const [phone, setPhone] = useState(initial.phone);
  const [location, setLocation] = useState(initial.location);
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
  const {
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
    bindField,
    resetErrors,
  } = useFieldErrors<EditProfileFormValues>();

  const { editProfile, isSaving } = useEditProfile({
    onSuccess: () => {
      setErrorMessage(null);
      onSuccess?.();
    },
    onError: (error) => {
      setErrorMessage(getApiErrorMessage(error, EDIT_PROFILE_ERROR_MESSAGES));
    },
  });

  const pickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      toast.error("Cần cấp quyền truy cập thư viện ảnh để chọn ảnh.", {
        position: "bottom",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    setAvatarUri(result.assets[0].uri);
  };

  const submit = () => {
    if (isSaving) return;
    const result = validate(editProfileSchema, { fullName, phone, location });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    resetErrors();
    editProfile({
      fullName: result.data.fullName,
      phone: result.data.phone,
      location: result.data.location || undefined,
      avatarUri,
    });
  };

  return {
    fullName,
    setFullName: bindField("fullName", setFullName),
    email: initial.email,
    phone,
    setPhone: bindField("phone", setPhone),
    location,
    setLocation: bindField("location", setLocation),
    avatarUrl: avatarUri ?? initial.avatarUrl,
    pickAvatar,
    saving: isSaving,
    errors,
    errorMessage,
    submit,
  };
}
