import React from "react";
import { Pressable, Text, View } from "react-native";

import type { BookingTab } from "@/features/pet-owner/bookings/types";
import { cn } from "@/lib/utils";

type TabConfig = {
  key: BookingTab;
  label: string;
  count: number;
};

type BookingsTabsProps = {
  value: BookingTab;
  onChange: (tab: BookingTab) => void;
  upcomingCount: number;
  pastCount: number;
};

export function BookingsTabs({
  value,
  onChange,
  upcomingCount,
  pastCount,
}: BookingsTabsProps) {
  const tabs: TabConfig[] = [
    { key: "upcoming", label: "Sắp tới", count: upcomingCount },
    { key: "past", label: "Lịch sử", count: pastCount },
  ];

  return (
    <View className="flex-row gap-1 rounded-full bg-muted p-1">
      {tabs.map((tab) => {
        const isActive = tab.key === value;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            className={cn(
              "flex-1 flex-row items-center justify-center gap-1.5 rounded-full py-2.5",
              isActive ? "bg-primary shadow-sm" : "shadow-none"
            )}
          >
            <Text
              className={cn(
                "font-mbold text-[14px] leading-5",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {tab.label}
            </Text>
            <Text
              className={cn(
                "font-mbold text-[12px] leading-4",
                isActive
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground/70"
              )}
            >
              {tab.count}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
