import React from "react";
import { Text, View } from "react-native";
import { Palette, Ruler, Weight } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import type { PetDetail } from "@/features/pet-owner/pet-detail/types";

type StatItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

type PetStatsGridProps = {
  pet: PetDetail;
};

export function PetStatsGrid({ pet }: PetStatsGridProps) {
  const stats: StatItem[] = [
    {
      icon: <Weight size={18} color={Colors.light.icon} />,
      label: "Cân nặng",
      value: pet.weight,
    },
    {
      icon: <Ruler size={18} color={Colors.light.icon} />,
      label: "Chiều cao",
      value: pet.height,
    },
    {
      icon: <Palette size={18} color={Colors.light.icon} />,
      label: "Màu sắc",
      value: pet.color,
    },
  ];

  return (
    <View className="flex-row gap-4">
      {stats.map((stat) => (
        <View
          key={stat.label}
          className="flex-1 items-center justify-center rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          {stat.icon}
          <Text className="mt-2 font-mbold text-[11px] uppercase leading-4 tracking-wider text-muted-foreground">
            {stat.label}
          </Text>
          <Text className="mt-1 font-mbold text-[18px] leading-6 text-primary">
            {stat.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
