import { useEffect, useRef, useState } from "react";

import type { LoginCredentials } from "@/features/authentication/login/types";

type UseLoginFormOptions = {
  onSubmit?: (credentials: LoginCredentials) => void;
};

export function useLoginForm({ onSubmit }: UseLoginFormOptions = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const submit = () => {
    if (loading) return;
    setLoading(true);
    onSubmit?.({ email, password });
    timeoutRef.current = setTimeout(() => setLoading(false), 1500);
  };

  return { email, setEmail, password, setPassword, loading, submit };
}
