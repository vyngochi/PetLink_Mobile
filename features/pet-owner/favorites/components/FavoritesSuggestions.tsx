import { Bell, Compass } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type SuggestionCard = {
  key: string;
  label: string;
  icon: typeof Compass;
  containerClassName: string;
  iconClassName: string;
  onPress?: () => void;
};

type FavoritesSuggestionsProps = {
  onExplore?: () => void;
  onEnableNotifications?: () => void;
};

export function FavoritesSuggestions({
  onExplore,
  onEnableNotifications,
}: FavoritesSuggestionsProps) {
  const cards: SuggestionCard[] = [
    {
      key: "explore",
      label: "Khám phá thêm cơ sở gần bạn",
      icon: Compass,
      containerClassName: "bg-secondary/10",
      iconClassName: "text-secondary",
      onPress: onExplore,
    },
    {
      key: "notifications",
      label: "Nhận thông báo ưu đãi",
      icon: Bell,
      containerClassName: "bg-primary/10",
      iconClassName: "text-primary",
      onPress: onEnableNotifications,
    },
  ];

  return (
    <View className="mt-6 flex-row gap-4">
      {cards.map(({ key, label, icon: Icon, containerClassName, iconClassName, onPress }) => (
        <Pressable
          key={key}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={label}
          style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}
          className={`h-40 flex-1 justify-between rounded-[24px] p-5 ${containerClassName}`}
        >
          <Icon size={24} className={iconClassName} />
          <Text className="font-mbold text-[13px] leading-[18px] text-foreground">
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
