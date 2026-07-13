import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CalendarPlus } from "lucide-react-native";

type PetDetailFooterProps = {
  onEditProfile?: () => void;
  onBookVet?: () => void;
};

export function PetDetailFooter({
  onEditProfile,
  onBookVet,
}: PetDetailFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-border/50 bg-background px-5 pt-4"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }}
    >
      <Pressable
        onPress={onEditProfile}
        accessibilityRole="button"
        accessibilityLabel="Chỉnh sửa hồ sơ"
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.96 : 1 }] })}
        className="h-14 flex-1 items-center justify-center rounded-full border-2 border-primary"
      >
        <Text className="font-mbold text-[14px] leading-5 text-primary">
          Chỉnh sửa
        </Text>
      </Pressable>

      <Pressable
        onPress={onBookVet}
        accessibilityRole="button"
        accessibilityLabel="Đặt lịch khám"
        style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.96 : 1 }] })}
        className="h-14 flex-[1.5] flex-row items-center justify-center gap-2 rounded-full bg-primary shadow-sm"
      >
        <CalendarPlus size={20} color="#ffffff" />
        <Text className="font-mbold text-[14px] leading-5 text-primary-foreground">
          Đặt lịch khám
        </Text>
      </Pressable>
    </View>
  );
}
