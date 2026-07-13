import { useRouter, type Href } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
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
import { useCreatePet } from "@/features/pet-owner/pet-edit/hooks/useCreatePet";
import { usePetForm } from "@/features/pet-owner/pet-edit/hooks/usePetForm";
import { useUpdatePet } from "@/features/pet-owner/pet-edit/hooks/useUpdatePet";
import { toPetPayload } from "@/features/pet-owner/pet-edit/utils/pet-payload";
import { getApiErrorMessage } from "@/lib/http";

type PetFormViewProps = {
  petId?: string;
};

export function PetFormView({ petId }: PetFormViewProps) {
  const router = useRouter();
  const { pet, isLoading } = usePetDetail(petId ?? "");

  if (!petId) {
    return <PetForm />;
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={Colors.light.tint} />
      </View>
    );
  }

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

  return <PetForm pet={pet} />;
}

function PetForm({ pet }: { pet?: PetDetail }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const createPet = useCreatePet();
  const updatePet = useUpdatePet();

  const isEdit = Boolean(pet);
  const saving = createPet.isPending || updatePet.isPending;

  const showError = (error: unknown, fallback: string) => {
    toast.error(
      getApiErrorMessage(error, {
        fallback,
        network: "Không có kết nối mạng. Vui lòng thử lại.",
      }),
      { position: "bottom" },
    );
  };

  const form = usePetForm({
    pet,
    onSubmit: (values, photos) => {
      const payload = toPetPayload(values, photos);

      if (pet) {
        updatePet.mutate(
          { petId: pet.id, payload },
          {
            onSuccess: () => {
              toast.success("Đã cập nhật hồ sơ thú cưng", {
                position: "bottom",
              });
              router.back();
            },
            onError: (error) =>
              showError(error, "Không cập nhật được hồ sơ thú cưng"),
          },
        );
        return;
      }

      createPet.mutate(payload, {
        onSuccess: (created) => {
          toast.success("Đã thêm thú cưng", { position: "bottom" });
          router.replace(`/pet-owner/pet/${created.id}` as Href);
        },
        onError: (error) => showError(error, "Không thêm được thú cưng"),
      });
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <EditPetHeader
          title={isEdit ? "Chỉnh sửa hồ sơ" : "Thêm thú cưng"}
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
            <PetPhotoEditor
              uri={form.imageUrl}
              name={form.name}
              onChangePhoto={form.pickImage}
            />
            {form.errors.imageUrl ? (
              <Text className="mt-3 text-center font-default text-[12px] leading-4 text-destructive">
                {form.errors.imageUrl}
              </Text>
            ) : null}
          </View>

          <View className="gap-5">
            <PetFormField
              label="Tên thú cưng"
              value={form.name}
              onChangeText={form.setName}
              placeholder="Nhập tên thú cưng"
              autoCapitalize="words"
              error={form.errors.name}
            />
            <PetFormField
              label="Giống loài"
              value={form.breed}
              onChangeText={form.setBreed}
              placeholder="VD: Golden Retriever"
              autoCapitalize="words"
              error={form.errors.breed}
            />

            <View className="flex-row gap-4">
              <View className="flex-1">
                <PetGenderField
                  label="Giới tính"
                  value={form.gender}
                  onChange={form.setGender}
                />
              </View>
              <View className="flex-1">
                <PetFormField
                  label="Độ tuổi"
                  value={form.ageLabel}
                  onChangeText={form.setAgeLabel}
                  placeholder="VD: 3"
                  error={form.errors.ageLabel}
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <PetFormField
                  label="Cân nặng (kg)"
                  value={form.weight}
                  onChangeText={form.setWeight}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  error={form.errors.weight}
                />
              </View>
              <View className="flex-1">
                <PetFormField
                  label="Chiều cao (cm)"
                  value={form.height}
                  onChangeText={form.setHeight}
                  placeholder="0"
                  keyboardType="decimal-pad"
                  error={form.errors.height}
                />
              </View>
            </View>

            <PetFormField
              label="Màu sắc"
              value={form.color}
              onChangeText={form.setColor}
              placeholder="VD: Vàng"
              autoCapitalize="words"
              error={form.errors.color}
            />

            <MedicalNotesField
              value={form.medicalNotes}
              onChangeText={form.setMedicalNotes}
              error={form.errors.medicalNotes}
            />

            <PetMomentsEditor
              petName={form.name.trim().length > 0 ? form.name : "thú cưng"}
              photos={form.photos}
              onAddPhoto={form.canAddPhoto ? form.addPhotos : undefined}
              onRemovePhoto={form.removePhoto}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 px-5 pt-4"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }}
      >
        <SavePetButton
          label={isEdit ? "Lưu thay đổi" : "Thêm thú cưng"}
          onPress={form.submit}
          saving={saving}
        />
      </View>
    </SafeAreaView>
  );
}
