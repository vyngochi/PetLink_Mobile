import { useState } from "react";

import type { FieldErrors } from "@/lib/validation";

export function useFieldErrors<T>() {
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearFieldError = (field: keyof T) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    setErrorMessage((prev) => (prev ? null : prev));
  };

  const bindField =
    (field: keyof T, setValue: (value: string) => void) => (value: string) => {
      setValue(value);
      clearFieldError(field);
    };

  const resetErrors = () => {
    setErrors({});
    setErrorMessage(null);
  };

  return {
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
    clearFieldError,
    bindField,
    resetErrors,
  };
}
