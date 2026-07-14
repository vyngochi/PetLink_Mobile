import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type { Conversation } from "@/features/pet-owner/chat/shared/types";
import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { cn } from "@/lib/utils";

type ConversationCardProps = {
  conversation: Conversation;
  onPress: () => void;
};

export function ConversationCard({
  conversation,
  onPress,
}: ConversationCardProps) {
  const hasUnread = conversation.unreadCount > 0;
  const isNew = conversation.createAt
    ? Date.now() - new Date(conversation.createAt).getTime() < 10 * 60 * 1000
    : false;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Trò chuyện với ${conversation.name}`}
      className={cn(
        "flex-row items-center gap-4 p-4 active:opacity-80",
        conversation.isPinned
          ? "rounded-[24px] border border-border bg-card shadow-sm"
          : "rounded-[20px] border-b border-border/50 shadow-none",
      )}
    >
      <View>
        <Image
          source={{
            uri: getImageUrl(conversation.avatarUrl, { width: 56, height: 56 }),
          }}
          accessibilityLabel={conversation.name}
          contentFit="cover"
          transition={200}
          style={{ width: 56, height: 56, borderRadius: 28 }}
        />
        {conversation.isOnline && (
          <View className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card bg-primary" />
        )}
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between gap-2">
          <View className="flex-row items-center flex-1 gap-2">
            <Text
              className="font-mbold text-[15px] leading-6 text-foreground flex-shrink"
              numberOfLines={1}
            >
              {conversation.name}
            </Text>
            {isNew && (
              <View className="rounded bg-destructive/10 px-1.5 py-0.5">
                <Text className="font-mbold text-[9px] uppercase leading-3 tracking-wider text-destructive">
                  New
                </Text>
              </View>
            )}
          </View>
          <Text
            className={cn(
              "text-[11px] leading-4",
              hasUnread
                ? "font-mbold text-primary"
                : "font-default text-muted-foreground",
            )}
          >
            {conversation.lastMessageAtLabel}
          </Text>
        </View>
        <Text
          className={cn(
            "mt-1 text-[13px] leading-5",
            hasUnread
              ? "font-mbold text-foreground"
              : "font-default text-muted-foreground",
          )}
          numberOfLines={1}
        >
          {conversation.lastMessage}
        </Text>
      </View>

      {hasUnread && (
        <View className="h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5">
          <Text className="font-mbold text-[10px] text-primary-foreground">
            {conversation.unreadCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
