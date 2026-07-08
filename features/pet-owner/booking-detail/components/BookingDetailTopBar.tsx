import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type BookingDetailTopBarProps = {
  title?: string;
};

export function BookingDetailTopBar({
  title = "Chi tiết đặt lịch",
}: BookingDetailTopBarProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center gap-2 px-5 py-2">
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Quay lại"
        className="h-10 w-10 items-center justify-center rounded-full active:bg-muted"
      >
        <ArrowLeft size={24} className="text-primary" />
      </Pressable>
      <Text className="font-mbold text-[20px] leading-7 text-foreground">
        {title}
      </Text>
    </View>
  );
}
