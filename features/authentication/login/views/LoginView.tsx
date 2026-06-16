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
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";

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
          {/* Brand */}
          <View className="mb-10">
            <AuthHeader size={170} />
          </View>

          {/* Welcome copy */}
          <View className="mb-8">
            <Text className="mb-2 font-bold text-[28px] leading-9 text-foreground">
              Welcome Back!
            </Text>
            <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
              Log in to manage your pet&apos;s health and schedule.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <AuthInput
              label="Email Address"
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
                <Text className="font-semibold text-[14px] leading-5 text-muted-foreground">
                  Password
                </Text>
                <Pressable hitSlop={8}>
                  <Text className="font-medium text-[12px] leading-4 text-primary">
                    Forgot Password?
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
              <PrimaryButton label="Log In" onPress={submit} loading={loading} />
            </View>
          </View>

          {/* Divider */}
          <View className="my-8">
            <AuthDivider />
          </View>

          {/* Social */}
          <GoogleButton />

          {/* Footer */}
          <View className="mt-auto flex-row items-center justify-center pb-4 pt-8">
            <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
              Don&apos;t have an account?{" "}
            </Text>
            <Pressable hitSlop={8} onPress={() => router.push("/register")}>
              <Text className="font-semibold text-[14px] leading-[21px] text-primary">
                Register
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
