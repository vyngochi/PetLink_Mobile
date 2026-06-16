import React, { useState } from "react";
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

export function RegisterView() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const mismatch =
    submitted && confirmPassword.length > 0 && confirmPassword !== password;

  const handleRegister = () => {
    setSubmitted(true);
    if (loading || password !== confirmPassword || password.length === 0) {
      return;
    }
    setLoading(true);
    // Placeholder for the register mutation wired up later via hooks/services.
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <AuthBackground />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow items-center justify-center px-margin-side py-section-gap-lg"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View className="mb-section-gap-lg">
            <AuthHeader badgeSize={56} />
          </View>

          {/* Registration card */}
          <View
            className="w-full max-w-md rounded-3xl bg-surface p-8"
            style={{
              shadowColor: "#0b1c30",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <View className="mb-section-gap-sm">
              <Text className="mb-2 font-semibold text-[20px] leading-7 text-on-surface">
                Create Account
              </Text>
              <Text className="font-default text-[14px] leading-[21px] text-on-surface-variant">
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
                  onPress={handleRegister}
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
            <Text className="font-default text-[14px] leading-[21px] text-on-surface-variant">
              Already have an account?{" "}
            </Text>
            <Pressable hitSlop={8} onPress={() => router.push("/login")}>
              <Text className="font-semibold text-[14px] leading-[21px] text-primary-deep">
                Log In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
