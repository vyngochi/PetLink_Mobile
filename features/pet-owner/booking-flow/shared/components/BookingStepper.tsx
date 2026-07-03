import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";

interface BookingStepperProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export function BookingStepper({
  title,
  currentStep,
  totalSteps,
  onBack,
}: BookingStepperProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);
  const segments = Array.from({ length: totalSteps }, (_, index) => index < currentStep);

  return (
    <View className="border-b border-border/50 bg-background px-5 pb-4">
      <View className="flex-row items-center justify-between py-2">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm active:opacity-80"
        >
          <ChevronLeft size={22} className="text-foreground" />
        </Pressable>
        <Text className="font-mbold text-[17px] text-foreground">{title}</Text>
        <View className="w-10" />
      </View>

      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-default text-[12px] uppercase tracking-wider text-muted-foreground">
          {`Bước ${currentStep}/${totalSteps}`}
        </Text>
        <Text className="font-mbold text-[12px] text-primary">{`${percent}%`}</Text>
      </View>

      <View className="flex-row items-center gap-1.5">
        {segments.map((filled, index) => (
          <View
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              filled ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </View>
    </View>
  );
}
