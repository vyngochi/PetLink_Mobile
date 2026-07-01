import { HeartOff } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import type { FavoriteTab } from "@/features/pet-owner/favorites/types";

type EmptyFavoritesProps = {
  tab: FavoriteTab;
};

export function EmptyFavorites({ tab }: EmptyFavoritesProps) {
  const message =
    tab === "provider"
      ? "Bạn chưa lưu cơ sở nào. Hãy nhấn vào biểu tượng trái tim để lưu lại cơ sở yêu thích."
      : "Bạn chưa lưu dịch vụ nào. Hãy nhấn vào biểu tượng trái tim để lưu lại dịch vụ yêu thích.";

  return (
    <View className="items-center justify-center px-8 py-16">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-muted">
        <HeartOff size={28} className="text-muted-foreground" />
      </View>
      <Text className="mt-4 text-center font-default text-[14px] leading-[21px] text-muted-foreground">
        {message}
      </Text>
    </View>
  );
}
