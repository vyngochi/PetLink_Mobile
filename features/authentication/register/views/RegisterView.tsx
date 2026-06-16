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
import { KeyRound, Lock, Mail, User } from "lucide-react-native";

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
          {/* Brand */}
          <View className="mb-10">
            <AuthHeader size={130} />
          </View>

          {/* Registration card */}
          <View
            className="w-full max-w-md rounded-3xl bg-card p-8"
            style={{
              shadowColor: authColors.cardShadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <View className="mb-6">
              <Text className="mb-2 font-semibold text-[20px] leading-7 text-card-foreground">
                Create Account
              </Text>
              <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
                Join PetLink to manage your pet&apos;s health and schedule.
              </Text>
            </View>

            <View className="gap-4">
              <AuthInput
                label="Full Name"
                icon={User}
                fillClassName="bg-background"
                value={fullName}
                onChangeText={setFullName}
                placeholder="John Doe"
                autoCapitalize="words"
                textContentType="name"
              />
              <AuthInput
                label="Email Address"
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
                label="Password"
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
                label="Confirm Password"
                icon={KeyRound}
                fillClassName="bg-background"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secure
                autoCapitalize="none"
                textContentType="newPassword"
                error={mismatch ? "Passwords do not match." : undefined}
              />

              <View className="mt-2">
                <PrimaryButton
                  label="Register"
                  onPress={submit}
                  loading={loading}
                />
              </View>
            </View>

            <View className="my-6">
              <AuthDivider />
            </View>

            <GoogleButton label="Continue with Google" />
          </View>

          {/* Footer */}
          <View className="mt-8 flex-row items-center justify-center">
            <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
              Already have an account?{" "}
            </Text>
            <Pressable hitSlop={8} onPress={() => router.push("/login")}>
              <Text className="font-semibold text-[14px] leading-[21px] text-primary">
                Log In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
