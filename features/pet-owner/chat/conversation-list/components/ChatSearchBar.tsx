import { Search } from "lucide-react-native";
import React from "react";
import { TextInput, View } from "react-native";

type ChatSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function ChatSearchBar({ value, onChangeText }: ChatSearchBarProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl border border-border bg-card px-4">
      <Search size={20} className="text-muted-foreground" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Tìm kiếm cuộc trò chuyện..."
        placeholderTextColor="#64748B"
        returnKeyType="search"
        className="flex-1 py-3 font-default text-[14px] text-foreground"
      />
    </View>
  );
}
