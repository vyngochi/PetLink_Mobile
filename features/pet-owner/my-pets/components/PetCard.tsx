import React from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { CalendarDays, ChevronRight, Syringe } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import type { Pet } from "@/features/pet-owner/my-pets/types";

type PetCardProps = {
  pet: Pet;
  onViewProfile?: (pet: Pet) => void;
  onVaccinePress?: (pet: Pet) => void;
};

export function PetCard({ pet, onViewProfile, onVaccinePress }: PetCardProps) {
  return (
    <View className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <View className="mb-4 flex-row items-start gap-4">
        <Image
          source={{ uri: pet.imageUrl }}
          accessibilityLabel={pet.name}
          contentFit="cover"
          transition={200}
          style={{ width: 96, height: 96, borderRadius: 16 }}
        />
        <View className="flex-1">
          <View className="flex-row items-start justify-between">
            <Text className="mb-1 font-mbold text-[18px] leading-6 text-foreground">
              {pet.name}
            </Text>
            <View className="rounded-full bg-primary/10 px-3 py-1">
              <Text className="font-mbold text-[12px] leading-4 text-primary">
                Khỏe mạnh
              </Text>
            </View>
          </View>
          <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
            {pet.breed}
          </Text>
          <View className="mt-2 flex-row items-center gap-1">
            <CalendarDays size={16} color={Colors.light.icon} />
            <Text className="font-mbold text-[12px] leading-4 text-muted-foreground">
              {pet.ageLabel}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => onVaccinePress?.(pet)}
        accessibilityRole="button"
        accessibilityLabel="Vắc-xin tiếp theo"
        className="mb-5 flex-row items-center justify-between rounded-2xl bg-muted p-4"
      >
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Syringe size={20} color={Colors.light.tint} />
          </View>
          <View>
            <Text className="font-mbold text-[12px] leading-4 text-muted-foreground">
              Vắc-xin tiếp theo
            </Text>
            <Text className="font-mbold text-[14px] leading-5 text-foreground">
              {pet.nextVaccineDate ?? "Chưa có lịch"}
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color={Colors.light.icon} />
      </Pressable>

      <Pressable
        onPress={() => onViewProfile?.(pet)}
        accessibilityRole="button"
        accessibilityLabel={`Xem hồ sơ của ${pet.name}`}
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
        className="h-12 items-center justify-center rounded-full bg-primary"
      >
        <Text className="font-mbold text-[14px] leading-5 text-primary-foreground">
          Xem hồ sơ
        </Text>
      </Pressable>
    </View>
  );
}
