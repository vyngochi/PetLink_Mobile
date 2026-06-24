import React from "react";
import { Text, View } from "react-native";
import { CalendarDays, Syringe } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import type { HealthReminder } from "@/features/pet-owner/pet-detail/types";

type HealthRemindersSectionProps = {
  reminder?: HealthReminder;
};

export function HealthRemindersSection({
  reminder,
}: HealthRemindersSectionProps) {
  if (!reminder) {
    return null;
  }

  return (
    <View>
      <Text className="mb-4 font-mbold text-[18px] leading-6 text-foreground">
        Nhắc nhở sức khỏe
      </Text>
      <View className="flex-row items-start gap-4 rounded-2xl border-l-4 border-primary bg-primary/5 p-5 shadow-sm">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Syringe size={22} color={Colors.light.tint} />
        </View>
        <View className="flex-1">
          <Text className="font-mbold text-[14px] leading-5 text-foreground">
            {reminder.title}
          </Text>
          <View className="mt-1 flex-row items-center gap-2">
            <CalendarDays size={16} color={Colors.light.icon} />
            <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
              {reminder.date}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
