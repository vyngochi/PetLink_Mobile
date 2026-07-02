import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";

const STEPS = {
  1: { label: "Bước 1/3", percent: "33%", barClass: "w-1/3" },
  2: { label: "Bước 2/3", percent: "66%", barClass: "w-2/3" },
} as const;

interface BookingStepHeaderProps {
  title: string;
  step: keyof typeof STEPS;
}

export function BookingStepHeader({ title, step }: BookingStepHeaderProps) {
  const router = useRouter();
  const config = STEPS[step];

  return (
    <View className="border-b border-border/50 bg-background px-5 pb-4">
      <View className="flex-row items-center justify-between py-2">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm active:opacity-80"
        >
          <ChevronLeft size={22} className="text-foreground" />
        </Pressable>
        <Text className="font-mbold text-[17px] text-foreground">{title}</Text>
        <View className="w-10" />
      </View>

      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-default text-[12px] uppercase tracking-wider text-muted-foreground">
          {config.label}
        </Text>
        <Text className="font-mbold text-[12px] text-primary">
          {config.percent}
        </Text>
      </View>
      <View className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <View
          className={cn("h-full rounded-full bg-primary", config.barClass)}
        />
      </View>
    </View>
  );
}
