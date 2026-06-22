import { useState } from "react";

import { useFieldErrors } from "@/features/authentication/hooks/useFieldErrors";
import { REGISTER_ERROR_MESSAGES } from "@/features/authentication/register/constants/register-error-messages";
import { useRegister } from "@/features/authentication/register/hooks/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/authentication/register/utils/register.schema";
import type { RegisterResponse } from "@/features/authentication/register/types";
import { getApiErrorMessage } from "@/lib/http";
import { validate } from "@/lib/validation";

type UseRegisterFormOptions = {
  onSuccess?: (data: RegisterResponse) => void;
};

export function useRegisterForm({ onSuccess }: UseRegisterFormOptions = {}) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    errors,
    setErrors,
    errorMessage,
    setErrorMessage,
    bindField,
    resetErrors,
  } = useFieldErrors<RegisterFormValues>();

  const { register, isRegistering } = useRegister({
    onSuccess: (data) => {
      setErrorMessage(null);
      onSuccess?.(data);
    },
    onError: (error) => {
      setErrorMessage(getApiErrorMessage(error, REGISTER_ERROR_MESSAGES));
    },
  });

  const submit = () => {
    if (isRegistering) return;
    const result = validate(registerSchema, {
      userName,
      email,
      phone,
      password,
      confirmPassword,
    });
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    const { confirmPassword: _confirmPassword, ...payload } = result.data;
    resetErrors();
    register(payload);
  };

  return {
    userName,
    setUserName: bindField("userName", setUserName),
    email,
    setEmail: bindField("email", setEmail),
    phone,
    setPhone: bindField("phone", setPhone),
    password,
    setPassword: bindField("password", setPassword),
    confirmPassword,
    setConfirmPassword: bindField("confirmPassword", setConfirmPassword),
    loading: isRegistering,
    errors,
    errorMessage,
    submit,
  };
}
