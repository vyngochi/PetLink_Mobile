import React from "react";
import { Pressable, Text, View } from "react-native";

import { GENDER_OPTIONS } from "@/features/pet-owner/pet-edit/constants/gender";
import type { PetGender } from "@/features/pet-owner/pet-edit/types";
import { cn } from "@/lib/utils";

type PetGenderFieldProps = {
  label: string;
  value: PetGender;
  onChange: (value: PetGender) => void;
};

export function PetGenderField({ label, value, onChange }: PetGenderFieldProps) {
  return (
    <View className="gap-2">
      <Text className="ml-1 font-mbold text-[14px] leading-5 text-foreground">
        {label}
      </Text>

      <View className="h-14 flex-row items-center rounded-xl border border-border bg-card p-1">
        {GENDER_OPTIONS.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={option.label}
              className={cn(
                "h-full flex-1 items-center justify-center rounded-lg",
                selected && "bg-primary",
              )}
            >
              <Text
                className={cn(
                  "font-mbold text-[14px] leading-5",
                  selected ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
