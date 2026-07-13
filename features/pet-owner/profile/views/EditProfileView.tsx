import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
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
    setEmail,
    phone,
    setPhone,
    location,
    setLocation,
    saving,
    saved,
    submit,
  } = useEditProfileForm({ initial: profile });

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
              textContentType="name"
            />
            <ProfileFormField
              label="Địa chỉ email"
              value={email}
              onChangeText={setEmail}
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
              placeholder="+84 xxx xxx xxx"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
            />
            <ProfileFormField
              label="Địa điểm"
              value={location}
              onChangeText={setLocation}
              placeholder="Thành phố, Quốc gia"
              trailingIcon={MapPin}
            />

            <View className="pt-2">
              <SaveButton
                label="Lưu thay đổi"
                onPress={submit}
                saving={saving}
                saved={saved}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
