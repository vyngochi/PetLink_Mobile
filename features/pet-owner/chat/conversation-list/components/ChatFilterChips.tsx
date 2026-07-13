import React from "react";
import { Pressable, Text, View } from "react-native";

import { CHAT_FILTERS } from "@/features/pet-owner/chat/conversation-list/constants/chat-filters";
import type { ConversationFilter } from "@/features/pet-owner/chat/shared/types";
import { cn } from "@/lib/utils";

type ChatFilterChipsProps = {
  value: ConversationFilter;
  onChange: (value: ConversationFilter) => void;
};

export function ChatFilterChips({ value, onChange }: ChatFilterChipsProps) {
  return (
    <View className="flex-row gap-3">
      {CHAT_FILTERS.map((item) => {
        const isActive = item.value === value;

        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            className={cn(
              "rounded-full px-6 py-2",
              isActive
                ? "bg-primary shadow-sm"
                : "border border-border bg-card shadow-none"
            )}
          >
            <Text
              className={cn(
                "font-mbold text-[13px] leading-5",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
