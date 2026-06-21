import { useEffect, useRef, useState } from "react";

import type {
  EditProfilePayload,
  UserProfile,
} from "@/features/pet-owner/profile/types";

type UseEditProfileFormOptions = {
  initial: UserProfile;
  onSubmit?: (payload: EditProfilePayload) => void;
};

export function useEditProfileForm({
  initial,
  onSubmit,
}: UseEditProfileFormOptions) {
  const [fullName, setFullName] = useState(initial.fullName);
  const [email, setEmail] = useState(initial.email);
  const [phone, setPhone] = useState(initial.phone);
  const [location, setLocation] = useState(initial.location);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const submit = () => {
    if (saving) return;
    setSaving(true);
    setSaved(false);
    onSubmit?.({ fullName, email, phone, location });
    timeoutRef.current = setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1500);
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    location,
    setLocation,
    saving,
    saved,
    submit,
  };
}
