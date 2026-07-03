import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toast } from "@/components/toast";
import {
  ChatDateSeparator,
  ChatDetailHeader,
  ChatInputBar,
  MessageBubble,
} from "@/features/pet-owner/chat/conversation-detail/components";
import { useConversation } from "@/features/pet-owner/chat/conversation-detail/hooks/useConversation";

type ChatDetailViewProps = {
  conversationId: string;
};

export function ChatDetailView({ conversationId }: ChatDetailViewProps) {
  const router = useRouter();
  const { conversation, messages, sendMessage } =
    useConversation(conversationId);
  const scrollRef = useRef<ScrollView>(null);

  const notifyComingSoon = () => {
    toast.info("Tính năng đang được phát triển", { position: "bottom" });
  };

  if (!conversation) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background px-5">
        <Text className="font-mbold text-[18px] text-muted-foreground">
          Không tìm thấy cuộc trò chuyện
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full bg-primary px-6 py-3"
        >
          <Text className="font-mbold text-primary-foreground">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ChatDetailHeader
        conversation={conversation}
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerClassName="gap-4 px-5 py-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          <ChatDateSeparator label="Hôm nay" />
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        <ChatInputBar onSend={sendMessage} onAttach={notifyComingSoon} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
