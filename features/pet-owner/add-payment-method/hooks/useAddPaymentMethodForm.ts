import { useEffect, useRef, useState } from "react";

import type { AddPaymentMethodFormValues } from "@/features/pet-owner/add-payment-method/types";
import { addPaymentMethodSchema } from "@/features/pet-owner/add-payment-method/utils/add-payment-method.schema";
import { validate, type FieldErrors } from "@/lib/validation";

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const formatCvv = (value: string) => value.replace(/\D/g, "").slice(0, 4);

type UseAddPaymentMethodFormOptions = {
  onSuccess?: (values: AddPaymentMethodFormValues) => void;
};

export function useAddPaymentMethodForm({
  onSuccess,
}: UseAddPaymentMethodFormOptions = {}) {
  const [cardNumber, setCardNumberValue] = useState("");
  const [cardName, setCardNameValue] = useState("");
  const [expiry, setExpiryValue] = useState("");
  const [cvv, setCvvValue] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const [errors, setErrors] = useState<FieldErrors<AddPaymentMethodFormValues>>(
    {},
  );
  const [saving, setSaving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clearError = (field: keyof AddPaymentMethodFormValues) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const setCardNumber = (value: string) => {
    setCardNumberValue(formatCardNumber(value));
    clearError("cardNumber");
  };

  const setCardName = (value: string) => {
    setCardNameValue(value);
    clearError("cardName");
  };

  const setExpiry = (value: string) => {
    setExpiryValue(formatExpiry(value));
    clearError("expiry");
  };

  const setCvv = (value: string) => {
    setCvvValue(formatCvv(value));
    clearError("cvv");
  };

  const submit = () => {
    if (saving) return;
    const result = validate(addPaymentMethodSchema, {
      cardNumber,
      cardName,
      expiry,
      cvv,
      saveCard,
    });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSaving(true);
    timeoutRef.current = setTimeout(() => {
      setSaving(false);
      onSuccess?.(result.data);
    }, 1200);
  };

  return {
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    saveCard,
    setSaveCard,
    errors,
    saving,
    submit,
  };
}
