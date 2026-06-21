import { useRouter } from "expo-router";
import { KeyRound, Lock, Mail, User } from "lucide-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AuthBackground,
  AuthDivider,
  AuthHeader,
  AuthInput,
  GoogleButton,
  PrimaryButton,
} from "@/features/authentication/components";
import { authColors } from "@/features/authentication/constants/colors";
import { useRegisterForm } from "@/features/authentication/register/hooks/useRegisterForm";

export function RegisterView() {
  const router = useRouter();
  const {
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
  } = useRegisterForm();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <AuthBackground />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow items-center justify-center px-6 py-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-10">
            <AuthHeader size={130} />
          </View>

          <View
            className="w-full max-w-md p-8 rounded-3xl bg-card"
            style={{
              shadowColor: authColors.cardShadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <View className="mb-6">
              <Text className=" text-center font-mbold text-[28px] leading-7 text-card-foreground">
                Tạo tài khoản
              </Text>
            </View>

            <View className="gap-4">
              <AuthInput
                label="Họ và tên"
                icon={User}
                fillClassName="bg-background"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Nguyễn Văn A"
                autoCapitalize="words"
                textContentType="name"
              />
              <AuthInput
                label="Địa chỉ email"
                icon={Mail}
                fillClassName="bg-background"
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
              <AuthInput
                label="Mật khẩu"
                icon={Lock}
                fillClassName="bg-background"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secure
                autoCapitalize="none"
                textContentType="newPassword"
              />
              <AuthInput
                label="Xác nhận mật khẩu"
                icon={KeyRound}
                fillClassName="bg-background"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secure
                autoCapitalize="none"
                textContentType="newPassword"
                error={mismatch ? "Mật khẩu không khớp." : undefined}
              />

              <View className="mt-2">
                <PrimaryButton
                  label="Đăng ký"
                  onPress={submit}
                  loading={loading}
                />
              </View>
            </View>

            <View className="my-6">
              <AuthDivider />
            </View>

            <GoogleButton label="Đăng ký với Google" />
          </View>

          <View className="flex-row items-center justify-center mt-8">
            <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
              Đã có tài khoản?{" "}
            </Text>
            <Pressable hitSlop={8} onPress={() => router.push("/login")}>
              <Text className="font-mbold text-[14px] leading-[21px] text-primary">
                Đăng nhập
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
