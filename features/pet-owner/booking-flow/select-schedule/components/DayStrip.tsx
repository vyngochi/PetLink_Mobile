import React from "react";
import { Pressable, ScrollView, Text } from "react-native";

import type { BookingDayOption } from "@/features/pet-owner/booking-flow/shared/types";
import { cn } from "@/lib/utils";

interface DayStripProps {
  days: BookingDayOption[];
  selectedDayId: string | null;
  onSelect: (dayId: string) => void;
}

export function DayStrip({ days, selectedDayId, onSelect }: DayStripProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 px-5"
    >
      {days.map((day) => {
        const selected = day.id === selectedDayId;

        return (
          <Pressable
            key={day.id}
            onPress={() => onSelect(day.id)}
            className={cn(
              "h-20 w-14 items-center justify-center rounded-2xl border shadow-sm",
              selected ? "border-primary bg-primary" : "border-border/50 bg-card",
            )}
          >
            <Text
              className={cn(
                "font-default text-[12px]",
                selected ? "text-white/80" : "text-muted-foreground",
              )}
            >
              {day.dayLabel}
            </Text>
            <Text
              className={cn(
                "mt-1 font-mbold text-[17px]",
                selected ? "text-white" : "text-foreground",
              )}
            >
              {day.dateNumber}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
