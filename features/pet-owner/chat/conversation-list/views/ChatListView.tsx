import { useRouter, type Href } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ChatFilterChips,
  ChatSearchBar,
  ConversationCard,
  EmptyConversations,
} from "@/features/pet-owner/chat/conversation-list/components";
import { useConversations } from "@/features/pet-owner/chat/conversation-list/hooks/useConversations";

export function ChatListView() {
  const router = useRouter();
  const { conversations, filter, setFilter, search, setSearch } =
    useConversations();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5 pt-2">
        <Text className="font-mbold text-[24px] leading-8 text-foreground">
          Tin nhắn
        </Text>
        <Text className="mt-1 font-default text-[13px] leading-5 text-muted-foreground">
          Trò chuyện với bác sĩ và dịch vụ chăm sóc thú cưng
        </Text>
      </View>

      <View className="gap-4 px-5 pt-4">
        <ChatSearchBar value={search} onChangeText={setSearch} />
        <ChatFilterChips value={filter} onChange={setFilter} />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-10 pt-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {conversations.length === 0 ? (
          <EmptyConversations hasSearch={search.trim().length > 0} />
        ) : (
          <View className="gap-3">
            {conversations.map((conversation) => (
              <ConversationCard
                key={conversation.id}
                conversation={conversation}
                onPress={() =>
                  router.push(`/pet-owner/chat/${conversation.id}` as Href)
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
