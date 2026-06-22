import axios from "axios";
import { useState } from "react";

import { useLogin } from "@/features/authentication/login/hooks/useLogin";
import type { LoginResponse } from "@/features/authentication/login/types";

type UseLoginFormOptions = {
  onSuccess?: (data: LoginResponse) => void;
};

export function useLoginForm({ onSuccess }: UseLoginFormOptions = {}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, isLoggingIn } = useLogin({
    onSuccess: (data) => {
      if (__DEV__) console.log("[Login] success");
      setErrorMessage(null);
      onSuccess?.(data);
    },
    onError: (error) => {
      if (__DEV__) console.log("[Login] error", error);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? (error.response.data.message as string)
          : "Đăng nhập thất bại. Vui lòng thử lại.";
      setErrorMessage(message);
    },
  });

  // Clear any visible error as soon as the user starts correcting their input.
  const handleUserNameChange = (value: string) => {
    setUserName(value);
    if (errorMessage) setErrorMessage(null);
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errorMessage) setErrorMessage(null);
  };

  const submit = () => {
    if (isLoggingIn) return;
    const trimmedUserName = userName.trim();
    if (!trimmedUserName || !password) {
      setErrorMessage("Vui lòng nhập tên đăng nhập và mật khẩu.");
      return;
    }
    if (__DEV__) console.log("[Login] submit", { userName: trimmedUserName });
    setErrorMessage(null);
    login({ userName: trimmedUserName, password });
  };

  return {
    userName,
    setUserName: handleUserNameChange,
    password,
    setPassword: handlePasswordChange,
    loading: isLoggingIn,
    errorMessage,
    submit,
  };
}
