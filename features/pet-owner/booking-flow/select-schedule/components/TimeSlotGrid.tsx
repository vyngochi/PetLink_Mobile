import React from "react";
import { Pressable, Text, View } from "react-native";

import type { BookingTimeSlot } from "@/features/pet-owner/booking-flow/shared/types";
import { cn } from "@/lib/utils";

interface TimeSlotGridProps {
  timeSlots: BookingTimeSlot[];
  selectedTimeSlotId: string | null;
  onSelect: (timeSlotId: string) => void;
}

export function TimeSlotGrid({
  timeSlots,
  selectedTimeSlotId,
  onSelect,
}: TimeSlotGridProps) {
  return (
    <View className="flex-row flex-wrap gap-3 px-5">
      {timeSlots.map((slot) => {
        const selected = slot.id === selectedTimeSlotId;

        return (
          <Pressable
            key={slot.id}
            disabled={!slot.available}
            onPress={() => onSelect(slot.id)}
            className={cn(
              "grow basis-[30%] items-center rounded-xl border py-3",
              selected
                ? "border-primary bg-primary"
                : "border-border bg-card active:bg-muted/40",
              !slot.available && "border-border/50 bg-muted/30 opacity-50",
            )}
          >
            <Text
              className={cn(
                "text-[14px]",
                selected
                  ? "font-mbold text-white"
                  : "font-default text-foreground",
                !slot.available && "text-muted-foreground",
              )}
            >
              {slot.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
