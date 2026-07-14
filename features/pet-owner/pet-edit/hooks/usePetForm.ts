import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { toast } from "@/components/toast";
import type { PetDetail } from "@/features/pet-owner/pet-detail/types";
import type { PetGender } from "@/features/pet-owner/pet-edit/types";
import {
  petFormSchema,
  type PetFormValues,
} from "@/features/pet-owner/pet-edit/utils/pet-form.schema";
import { isLocalImageUri } from "@/features/pet-owner/shared/utils/image-form-data";
import { validate, type FieldErrors } from "@/lib/validation";

type UsePetFormOptions = {
  pet?: PetDetail;
  onSubmit: (values: PetFormValues, photos: string[]) => void;
};

const MAX_NEW_PHOTOS = 5;

const stripUnit = (value: string) => value.replace(/[^\d.]/g, "");

const resolveGender = (gender: string): PetGender =>
  gender.trim().toLowerCase().startsWith("đ") ? "male" : "female";

export function usePetForm({ pet, onSubmit }: UsePetFormOptions) {
  const [name, setNameValue] = useState(pet?.name ?? "");
  const [breed, setBreedValue] = useState(pet?.breed ?? "");
  const [gender, setGenderValue] = useState<PetGender>(
    pet ? resolveGender(pet.gender) : "female",
  );
  const [ageLabel, setAgeLabelValue] = useState(pet?.ageLabel ?? "");
  const [imageUrl, setImageUrlValue] = useState(pet?.imageUrl ?? "");
  const [weight, setWeightValue] = useState(stripUnit(pet?.weight ?? ""));
  const [height, setHeightValue] = useState(stripUnit(pet?.height ?? ""));
  const [color, setColorValue] = useState(pet?.color ?? "");
  const [medicalNotes, setMedicalNotesValue] = useState(pet?.criticalNote ?? "");
  const [photos, setPhotos] = useState<string[]>(pet?.photos ?? []);

  const [errors, setErrors] = useState<FieldErrors<PetFormValues>>({});

  const clearError = (field: keyof PetFormValues) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const bindField =
    (field: keyof PetFormValues, setter: (value: string) => void) =>
    (value: string) => {
      setter(value);
      clearError(field);
    };

  const setGender = (value: PetGender) => {
    setGenderValue(value);
    clearError("gender");
  };

  const removePhoto = (photo: string) => {
    setPhotos((prev) => prev.filter((item) => item !== photo));
  };

  const remainingPhotoSlots =
    MAX_NEW_PHOTOS - photos.filter(isLocalImageUri).length;

  const addPhotos = async () => {
    if (remainingPhotoSlots <= 0) {
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      toast.error("Cần cấp quyền truy cập thư viện ảnh để chọn ảnh.", {
        position: "bottom",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: remainingPhotoSlots,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    setPhotos((prev) => [...prev, ...result.assets.map((asset) => asset.uri)]);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setErrors((prev) => ({
        ...prev,
        imageUrl: "Cần cấp quyền truy cập thư viện ảnh để chọn ảnh.",
      }));
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

    setImageUrlValue(result.assets[0].uri);
    clearError("imageUrl");
  };

  const submit = () => {
    const result = validate(petFormSchema, {
      name,
      breed,
      gender,
      ageLabel,
      imageUrl,
      weight,
      height,
      color,
      medicalNotes,
    });

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    onSubmit(result.data, photos);
  };

  return {
    name,
    setName: bindField("name", setNameValue),
    breed,
    setBreed: bindField("breed", setBreedValue),
    gender,
    setGender,
    ageLabel,
    setAgeLabel: bindField("ageLabel", setAgeLabelValue),
    imageUrl,
    pickImage,
    weight,
    setWeight: bindField("weight", setWeightValue),
    height,
    setHeight: bindField("height", setHeightValue),
    color,
    setColor: bindField("color", setColorValue),
    medicalNotes,
    setMedicalNotes: bindField("medicalNotes", setMedicalNotesValue),
    photos,
    addPhotos,
    removePhoto,
    canAddPhoto: remainingPhotoSlots > 0,
    errors,
    submit,
  };
}
