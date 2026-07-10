import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";

import {
  AvatarPicker,
  EditProfileHeader,
  ProfileFormField,
  SaveButton,
} from "@/features/pet-owner/profile/components";
import { useEditProfileForm } from "@/features/pet-owner/profile/hooks/useEditProfileForm";
import { useProfile } from "@/features/pet-owner/profile/hooks/useProfile";

export function EditProfileView() {
  const router = useRouter();
  const { profile } = useProfile();
  const {
    fullName,
    setFullName,
    email,
    phone,
    setPhone,
    location,
    setLocation,
    saving,
    errors,
    errorMessage,
    submit,
  } = useEditProfileForm({ initial: profile, onSuccess: () => router.back() });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <EditProfileHeader onBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-5 pb-12 pt-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <AvatarPicker uri={profile.avatarUrl} />
          </View>

          <View className="gap-6">
            <ProfileFormField
              label="Họ và tên"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Nhập họ và tên của bạn"
              autoCapitalize="words"
              vietnamese
              error={errors.fullName}
            />
            <ProfileFormField
              label="Địa chỉ email"
              value={email}
              editable={false}
              placeholder="ten@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <ProfileFormField
              label="Số điện thoại"
              value={phone}
              onChangeText={setPhone}
              placeholder="0xxxxxxxxx"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              error={errors.phone}
            />
            <ProfileFormField
              label="Địa chỉ liên lạc"
              value={location}
              onChangeText={setLocation}
              placeholder="Thành phố, Quốc gia"
              trailingIcon={MapPin}
              vietnamese
              error={errors.location}
            />

            {errorMessage ? (
              <Text className="px-1 font-default text-[13px] leading-5 text-destructive">
                {errorMessage}
              </Text>
            ) : null}

            <View className="pt-2">
              <SaveButton
                label="Lưu thay đổi"
                onPress={submit}
                saving={saving}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
