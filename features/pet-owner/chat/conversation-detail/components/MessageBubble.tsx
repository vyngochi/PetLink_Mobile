import { CheckCheck } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import type { ChatMessage } from "@/features/pet-owner/chat/shared/types";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.sender === "me") {
    return (
      <View className="max-w-[85%] items-end self-end">
        <View className="rounded-2xl rounded-br-[4px] bg-primary p-4 shadow-sm">
          <Text className="font-default text-[14px] leading-[21px] text-primary-foreground">
            {message.text}
          </Text>
        </View>
        <View className="mt-1.5 flex-row items-center gap-1 px-1">
          <Text className="font-default text-[11px] leading-4 text-muted-foreground">
            {message.sentAtLabel}
          </Text>
          {message.isRead && <CheckCheck size={14} className="text-primary" />}
        </View>
      </View>
    );
  }

  return (
    <View className="max-w-[85%] items-start self-start">
      <View className="rounded-2xl rounded-tl-[4px] border border-border bg-card p-4 shadow-sm">
        <Text className="font-default text-[14px] leading-[21px] text-foreground">
          {message.text}
        </Text>
      </View>
      <Text className="mt-1.5 px-1 font-default text-[11px] leading-4 text-muted-foreground">
        {message.sentAtLabel}
      </Text>
    </View>
  );
}
