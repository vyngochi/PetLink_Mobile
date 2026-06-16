import { useEffect, useRef, useState } from "react";

import type { RegisterCredentials } from "@/features/authentication/register/types";

type UseRegisterFormOptions = {
  /** Hooked up to the real auth service later; omitted while the screen is UI-only. */
  onSubmit?: (credentials: RegisterCredentials) => void;
};

/** Owns the register form state, confirm-password validation and submit flow. */
export function useRegisterForm({ onSubmit }: UseRegisterFormOptions = {}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const mismatch =
    submitted && confirmPassword.length > 0 && confirmPassword !== password;

  const submit = () => {
    setSubmitted(true);
    if (loading || password !== confirmPassword || password.length === 0) {
      return;
    }
    setLoading(true);
    onSubmit?.({ fullName, email, password, confirmPassword });
    // Placeholder timing until the register service (register/services) is wired in.
    timeoutRef.current = setTimeout(() => setLoading(false), 1500);
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    mismatch,
    submit,
  };
}
