import { MessagesSquare } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

type EmptyConversationsProps = {
  hasSearch: boolean;
};

export function EmptyConversations({ hasSearch }: EmptyConversationsProps) {
  const message = hasSearch
    ? "Không tìm thấy cuộc trò chuyện phù hợp. Thử từ khóa khác nhé."
    : "Các cuộc trò chuyện với bác sĩ và dịch vụ chăm sóc sẽ hiển thị tại đây.";

  return (
    <View className="items-center justify-center px-8 py-16">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-muted">
        <MessagesSquare size={28} className="text-muted-foreground" />
      </View>
      <Text className="mt-4 text-center font-default text-[14px] leading-[21px] text-muted-foreground">
        {message}
      </Text>
    </View>
  );
}
