import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import type { BookingTab } from "@/features/pet-owner/bookings/types";
import { cn } from "@/lib/utils";

type TabConfig = {
  key: BookingTab;
  label: string;
};

type BookingsTabsProps = {
  value: BookingTab;
  onChange: (tab: BookingTab) => void;
  counts: Record<BookingTab, number>;
};

export function BookingsTabs({ value, onChange, counts }: BookingsTabsProps) {
  const tabs: TabConfig[] = [
    { key: "all", label: "Tất cả" },
    { key: "pending_payment", label: "Chờ thanh toán" },
    { key: "pending_confirmation", label: "Chờ xác nhận" },
    { key: "confirmed", label: "Đã xác nhận" },
    { key: "checked_in", label: "Đã check-in" },
    { key: "checked_out", label: "Đã check-out" },
    { key: "completed", label: "Hoàn tất" },
    { key: "cancelled", label: "Đã hủy" },
    { key: "rejected", label: "Từ chối" },
    { key: "dispute", label: "Tranh chấp" },
    { key: "no_arrival", label: "Không đến" },
  ];

  return (
    <View className="mx-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-5 gap-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === value;
          const count = counts[tab.key] || 0;

          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              className={cn(
                "flex-row items-center justify-center gap-1.5 rounded-full px-4 py-2",
                isActive ? "bg-primary shadow-sm" : "bg-muted shadow-none",
              )}
            >
              <Text
                className={cn(
                  "font-mbold text-[14px] leading-5",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {tab.label}
              </Text>
              {count > 0 && (
                <Text
                  className={cn(
                    "font-mbold text-[12px] leading-4",
                    isActive
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground/70",
                  )}
                >
                  {count}
                </Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
