import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Image } from "expo-image";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type { Conversation } from "@/features/pet-owner/chat/shared/types";

type ChatDetailHeaderProps = {
  conversation: Conversation;
  onBack: () => void;
};

export function ChatDetailHeader({
  conversation,
  onBack,
}: ChatDetailHeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border/50 bg-background px-4 pb-3 pt-2">
      <View className="flex-1 flex-row items-center gap-2">
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          className="h-10 w-10 items-center justify-center rounded-full active:bg-muted"
        >
          <ArrowLeft size={24} className="text-foreground" />
        </Pressable>
        <View className="flex-1">
          <Text
            className="font-mbold text-[17px] leading-6 text-foreground"
            numberOfLines={1}
          >
            {conversation.name}
          </Text>
          <View className="flex-row items-center gap-1.5">
            {conversation.isOnline && (
              <View className="h-2 w-2 rounded-full bg-primary" />
            )}
            <Text className="font-default text-[11px] leading-4 text-muted-foreground">
              {conversation.isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={{
          uri: getImageUrl(conversation.avatarUrl, { width: 40, height: 40 }),
        }}
        accessibilityLabel={conversation.name}
        contentFit="cover"
        transition={200}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    </View>
  );
}
