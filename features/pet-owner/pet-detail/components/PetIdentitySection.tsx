import React from "react";
import { Text, View } from "react-native";
import { BadgeCheck } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import type { PetDetail } from "@/features/pet-owner/pet-detail/types";

type PetIdentitySectionProps = {
  pet: PetDetail;
};

export function PetIdentitySection({ pet }: PetIdentitySectionProps) {
  const isActive = pet.status === "active";

  return (
    <View className="flex-row items-end justify-between">
      <View className="flex-1 pr-3">
        <Text className="font-mbold text-[28px] leading-9 text-foreground">
          {pet.name}
        </Text>
        <Text className="mt-1 font-default text-[16px] leading-6 text-muted-foreground">
          {pet.breed} • {pet.gender} • {pet.ageLabel}
        </Text>
      </View>
      <View className="flex-row items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
        <BadgeCheck size={16} color={Colors.light.tint} />
        <Text className="font-mbold text-[12px] leading-4 text-primary">
          {isActive ? "Hoạt động" : "Tạm nghỉ"}
        </Text>
      </View>
    </View>
  );
}
