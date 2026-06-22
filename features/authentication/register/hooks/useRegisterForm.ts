import { useState } from "react";

import { useRegister } from "@/features/authentication/register/hooks/useRegister";
import type { AuthResponse } from "@/features/authentication/types";
import { getApiErrorMessage } from "@/lib/http";

type UseRegisterFormOptions = {
  onSuccess?: (data: AuthResponse) => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^0\d{9}$/;
const PASSWORD_MIN_LENGTH = 6;

export function useRegisterForm({ onSuccess }: UseRegisterFormOptions = {}) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, isRegistering } = useRegister({
    onSuccess: (data) => {
      if (__DEV__) console.log("[Register] success");
      setErrorMessage(null);
      onSuccess?.(data);
    },
    onError: (error) => {
      if (__DEV__) console.log("[Register] error", error);
      setErrorMessage(
        getApiErrorMessage(error, "Đăng ký thất bại. Vui lòng thử lại."),
      );
    },
  });

  const clearServerError = () => {
    if (errorMessage) setErrorMessage(null);
  };
  const withClear =
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      clearServerError();
    };

  const userNameInvalid = submitted && userName.trim().length === 0;
  const emailInvalid = submitted && !EMAIL_REGEX.test(email.trim());
  const phoneInvalid = submitted && !PHONE_REGEX.test(phone.trim());
  const passwordMissing = submitted && password.length === 0;
  const passwordTooShort =
    submitted && password.length > 0 && password.length < PASSWORD_MIN_LENGTH;
  const confirmPasswordMissing = submitted && confirmPassword.length === 0;
  const mismatch =
    submitted && confirmPassword.length > 0 && confirmPassword !== password;

  const submit = () => {
    setSubmitted(true);
    const userNameOk = userName.trim().length > 0;
    const emailOk = EMAIL_REGEX.test(email.trim());
    const phoneOk = PHONE_REGEX.test(phone.trim());
    const passwordOk = password.length >= PASSWORD_MIN_LENGTH;
    if (
      isRegistering ||
      !userNameOk ||
      !emailOk ||
      !phoneOk ||
      !passwordOk ||
      password !== confirmPassword
    ) {
      if (__DEV__) {
        console.log("[Register] submit blocked", {
          isRegistering,
          userNameOk,
          emailOk,
          phoneOk,
          passwordOk,
          passwordMatch: password === confirmPassword,
        });
      }
      return;
    }
    if (__DEV__) {
      console.log("[Register] submit", {
        userName: userName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
    }
    setErrorMessage(null);
    register({
      userName: userName.trim(),
      password,
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return {
    userName,
    setUserName: withClear(setUserName),
    email,
    setEmail: withClear(setEmail),
    phone,
    setPhone: withClear(setPhone),
    password,
    setPassword: withClear(setPassword),
    confirmPassword,
    setConfirmPassword: withClear(setConfirmPassword),
    loading: isRegistering,
    mismatch,
    userNameInvalid,
    emailInvalid,
    phoneInvalid,
    passwordMissing,
    passwordTooShort,
    confirmPasswordMissing,
    errorMessage,
    submit,
  };
}
