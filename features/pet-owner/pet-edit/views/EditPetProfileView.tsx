import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { usePetDetail } from "@/features/pet-owner/pet-detail/hooks/usePetDetail";
import type { PetDetail } from "@/features/pet-owner/pet-detail/types";
import {
  EditPetHeader,
  MedicalNotesField,
  PetFormField,
  PetGenderField,
  PetMomentsEditor,
  PetPhotoEditor,
  SavePetButton,
} from "@/features/pet-owner/pet-edit/components";
import { useEditPetForm } from "@/features/pet-owner/pet-edit/hooks/useEditPetForm";

type EditPetProfileViewProps = {
  petId: string;
};

export function EditPetProfileView({ petId }: EditPetProfileViewProps) {
  const router = useRouter();
  const { pet } = usePetDetail(petId);

  if (!pet) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background px-5">
        <Text className="font-mbold text-[18px] text-muted-foreground">
          Không tìm thấy thú cưng
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full bg-primary px-6 py-3"
        >
          <Text className="font-mbold text-primary-foreground">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return <EditPetProfileForm pet={pet} />;
}

function EditPetProfileForm({ pet }: { pet: PetDetail }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [photos, setPhotos] = useState(pet.photos);
  const {
    name,
    setName,
    breed,
    setBreed,
    gender,
    setGender,
    ageLabel,
    setAgeLabel,
    weight,
    setWeight,
    height,
    setHeight,
    color,
    setColor,
    medicalNotes,
    setMedicalNotes,
    errors,
    saving,
    saved,
    submit,
  } = useEditPetForm({ pet });

  const removePhoto = (photo: string) =>
    setPhotos((prev) => prev.filter((item) => item !== photo));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <EditPetHeader
          title="Chỉnh sửa hồ sơ"
          onBack={() => router.back()}
        />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-5 pt-6"
          contentContainerStyle={{ paddingBottom: 140 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <PetPhotoEditor uri={pet.imageUrl} name={name} />
          </View>

          <View className="gap-5">
            <PetFormField
              label="Tên thú cưng"
              value={name}
              onChangeText={setName}
              placeholder="Nhập tên thú cưng"
              autoCapitalize="words"
              error={errors.name}
            />
            <PetFormField
              label="Giống loài"
              value={breed}
              onChangeText={setBreed}
              placeholder="VD: Golden Retriever"
              autoCapitalize="words"
              error={errors.breed}
            />

            <View className="flex-row gap-4">
              <View className="flex-1">
                <PetGenderField
                  label="Giới tính"
                  value={gender}
                  onChange={setGender}
                />
              </View>
              <View className="flex-1">
                <PetFormField
                  label="Độ tuổi"
                  value={ageLabel}
                  onChangeText={setAgeLabel}
                  placeholder="VD: 3 tuổi"
                  error={errors.ageLabel}
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <PetFormField
                  label="Cân nặng (kg)"
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  error={errors.weight}
                />
              </View>
              <View className="flex-1">
                <PetFormField
                  label="Chiều cao (cm)"
                  value={height}
                  onChangeText={setHeight}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  error={errors.height}
                />
              </View>
            </View>

            <PetFormField
              label="Màu sắc"
              value={color}
              onChangeText={setColor}
              placeholder="VD: Vàng"
              autoCapitalize="words"
              error={errors.color}
            />

            <MedicalNotesField
              value={medicalNotes}
              onChangeText={setMedicalNotes}
              error={errors.medicalNotes}
            />

            <PetMomentsEditor
              petName={pet.name}
              photos={photos}
              onRemovePhoto={removePhoto}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 px-5 pt-4"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }}
      >
        <SavePetButton
          label="Lưu thay đổi"
          onPress={submit}
          saving={saving}
          saved={saved}
        />
      </View>
    </SafeAreaView>
  );
}
