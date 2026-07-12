import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Stethoscope } from "lucide-react-native";

import { petEditColors } from "@/features/pet-owner/pet-edit/constants/colors";

type MedicalNotesFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
};

export function MedicalNotesField({
  value,
  onChangeText,
  error,
}: MedicalNotesFieldProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? petEditColors.error
    : focused
      ? petEditColors.primary
      : petEditColors.border;

  return (
    <View className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <View className="mb-3 flex-row items-center gap-2">
        <Stethoscope size={20} color={petEditColors.primary} />
        <Text className="font-mbold text-[18px] leading-6 text-foreground">
          Ghi chú y tế
        </Text>
      </View>

      <View
        className="min-h-[100px] rounded-xl border bg-background p-4"
        style={{ borderColor }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Thêm dị ứng hoặc tiền sử bệnh lý..."
          placeholderTextColor={petEditColors.outline}
          multiline
          textAlignVertical="top"
          className="min-h-[80px] font-default text-[14px] leading-5 text-card-foreground"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>

      {error ? (
        <Text className="ml-1 mt-2 font-default text-[12px] leading-4 text-destructive">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
