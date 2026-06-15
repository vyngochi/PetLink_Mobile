import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";

import { REGISTER_CONTENT } from "@/features/authentication/register/constants/register.constants";
import type { RegisterFormValues } from "@/features/authentication/register/types/register.types";

const EMPTY_VALUES: RegisterFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

/**
 * Owns the Register form state, lightweight validation and submit flow.
 * The API call is stubbed — wire it to an auth service later.
 */
export function useRegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>(EMPTY_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = useCallback(
    (field: keyof RegisterFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const passwordMismatch = useMemo(
    () =>
      values.confirmPassword.length > 0 &&
      values.password !== values.confirmPassword,
    [values.password, values.confirmPassword],
  );

  const error = passwordMismatch
    ? REGISTER_CONTENT.confirmPassword.mismatch
    : null;

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || passwordMismatch) return;
    setIsSubmitting(true);
    try {
      // TODO: replace with features/authentication/register/services auth call.
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, passwordMismatch]);

  const goToLogin = useCallback(() => router.push("/login"), [router]);

  return {
    values,
    setField,
    error,
    isSubmitting,
    handleSubmit,
    goToLogin,
  };
}
