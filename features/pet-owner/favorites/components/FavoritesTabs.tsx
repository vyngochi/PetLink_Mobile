import React from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";
import type { FavoriteTab } from "@/features/pet-owner/favorites/types";

type TabConfig = {
  key: FavoriteTab;
  label: string;
  count: number;
};

type FavoritesTabsProps = {
  value: FavoriteTab;
  onChange: (tab: FavoriteTab) => void;
  providerCount: number;
  serviceCount: number;
};

export function FavoritesTabs({
  value,
  onChange,
  providerCount,
  serviceCount,
}: FavoritesTabsProps) {
  const tabs: TabConfig[] = [
    { key: "provider", label: "Cơ sở", count: providerCount },
    { key: "service", label: "Dịch vụ", count: serviceCount },
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
                isActive ? "text-primary-foreground/80" : "text-muted-foreground/70"
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
