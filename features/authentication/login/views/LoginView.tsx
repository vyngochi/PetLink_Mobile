import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
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
import { useLoginForm } from "@/features/authentication/login/hooks/useLoginForm";

export function LoginView() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, loading, submit } =
    useLoginForm();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <AuthBackground />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 pb-8 pt-12"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-10">
            <AuthHeader size={170} />
          </View>

          <View className="mb-8">
            <Text className="mb-2 text-center font-mbold text-[28px] leading-9 text-foreground">
              Chào mừng trở lại!
            </Text>
          </View>

          <View className="gap-4">
            <AuthInput
              label="Địa chỉ email"
              icon={Mail}
              value={email}
              onChangeText={setEmail}
              placeholder="hello@petlink.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <View className="gap-2">
              <View className="flex-row items-center justify-between px-1">
                <Text className="font-mbold text-[14px] leading-5 text-muted-foreground">
                  Mật khẩu
                </Text>
                <Pressable hitSlop={8}>
                  <Text className="font-mbold text-[12px] leading-4 text-primary">
                    Quên mật khẩu?
                  </Text>
                </Pressable>
              </View>
              <AuthInput
                label=""
                icon={Lock}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secure
                autoCapitalize="none"
                textContentType="password"
              />
            </View>

            <View className="mt-2">
              <PrimaryButton
                label="Đăng nhập"
                onPress={submit}
                loading={loading}
              />
            </View>
          </View>

          <View className="my-8">
            <AuthDivider />
          </View>

          <GoogleButton />

          <View className="flex-row items-center justify-center pt-8 pb-4 mt-auto">
            <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
              Chưa có tài khoản?{" "}
            </Text>
            <Pressable hitSlop={8} onPress={() => router.push("/register")}>
              <Text className="font-mbold text-[14px] leading-[21px] text-primary">
                Đăng ký
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
