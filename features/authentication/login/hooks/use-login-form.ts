import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

import type { LoginFormValues } from "@/features/authentication/login/types/login.types";

/**
 * Owns the Login form state and submit flow, keeping the view presentational.
 * The API call is intentionally stubbed — wire it to an auth service later.
 */
export function useLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = useCallback(
    (field: keyof LoginFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // TODO: replace with features/authentication/login/services auth call.
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const goToRegister = useCallback(() => router.push("/register"), [router]);

  return {
    values,
    setField,
    isSubmitting,
    handleSubmit,
    goToRegister,
  };
}
