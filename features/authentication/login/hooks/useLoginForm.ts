import { useState } from "react";

import { useFieldErrors } from "@/features/authentication/shared/hooks/useFieldErrors";
import { LOGIN_ERROR_MESSAGES } from "@/features/authentication/login/constants/login-error-messages";
import { useLogin } from "@/features/authentication/login/hooks/useLogin";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/authentication/login/utils/login.schema";
import type { User } from "@/features/authentication/shared/types";
import { getApiErrorMessage } from "@/lib/http";
import { validate } from "@/lib/validation";

type UseLoginFormOptions = {
  onSuccess?: (user: User) => void;
};

export function useLoginForm({ onSuccess }: UseLoginFormOptions = {}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
    bindField,
    resetErrors,
  } = useFieldErrors<LoginFormValues>();

  const { login, isLoggingIn } = useLogin({
    onSuccess: (data) => {
      setErrorMessage(null);
      onSuccess?.(data);
    },
    onError: (error) => {
      setErrorMessage(getApiErrorMessage(error, LOGIN_ERROR_MESSAGES));
    },
  });

  const submit = () => {
    if (isLoggingIn) return;
    const result = validate(loginSchema, { userName, password });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    resetErrors();
    login(result.data);
  };

  return {
    userName,
    setUserName: bindField("userName", setUserName),
    password,
    setPassword: bindField("password", setPassword),
    loading: isLoggingIn,
    errors,
    errorMessage,
    submit,
  };
}
