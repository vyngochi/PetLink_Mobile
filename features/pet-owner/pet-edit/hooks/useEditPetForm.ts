import { useEffect, useRef, useState } from "react";

import type { PetDetail } from "@/features/pet-owner/pet-detail/types";
import type {
  PetEditFormValues,
  PetGender,
} from "@/features/pet-owner/pet-edit/types";
import { petEditSchema } from "@/features/pet-owner/pet-edit/utils/pet-edit.schema";
import { validate, type FieldErrors } from "@/lib/validation";

type UseEditPetFormOptions = {
  pet: PetDetail;
  onSaved?: (values: PetEditFormValues) => void;
};

const stripUnit = (value: string) => value.replace(/[^\d.]/g, "");

const resolveGender = (gender: string): PetGender =>
  gender.trim().toLowerCase().startsWith("đ") ? "male" : "female";

export function useEditPetForm({ pet, onSaved }: UseEditPetFormOptions) {
  const [name, setNameValue] = useState(pet.name);
  const [breed, setBreedValue] = useState(pet.breed);
  const [gender, setGenderValue] = useState<PetGender>(resolveGender(pet.gender));
  const [ageLabel, setAgeLabelValue] = useState(pet.ageLabel);
  const [weight, setWeightValue] = useState(stripUnit(pet.weight));
  const [height, setHeightValue] = useState(stripUnit(pet.height));
  const [color, setColorValue] = useState(pet.color);
  const [medicalNotes, setMedicalNotesValue] = useState(pet.criticalNote ?? "");

  const [errors, setErrors] = useState<FieldErrors<PetEditFormValues>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clearFeedback = (field: keyof PetEditFormValues) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    setSaved((prev) => (prev ? false : prev));
  };

  const bindField =
    (field: keyof PetEditFormValues, setter: (value: string) => void) =>
    (value: string) => {
      setter(value);
      clearFeedback(field);
    };

  const setGender = (value: PetGender) => {
    setGenderValue(value);
    clearFeedback("gender");
  };

  const submit = () => {
    if (saving) return;
    const result = validate(petEditSchema, {
      name,
      breed,
      gender,
      ageLabel,
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
    setSaving(true);
    setSaved(false);
    onSaved?.(result.data);
    timeoutRef.current = setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1500);
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
    weight,
    setWeight: bindField("weight", setWeightValue),
    height,
    setHeight: bindField("height", setHeightValue),
    color,
    setColor: bindField("color", setColorValue),
    medicalNotes,
    setMedicalNotes: bindField("medicalNotes", setMedicalNotesValue),
    errors,
    saving,
    saved,
    submit,
  };
}
