import { Plus, SendHorizontal } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

type ChatInputBarProps = {
  onSend: (text: string) => void;
  onAttach: () => void;
};

export function ChatInputBar({ onSend, onAttach }: ChatInputBarProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <View className="flex-row items-center gap-3 px-4 py-3 border-t border-border/50 bg-card">
      <Pressable
        onPress={onAttach}
        accessibilityRole="button"
        accessibilityLabel="Đính kèm"
        className="items-center justify-center rounded-full h-11 w-11 active:bg-muted"
      >
        <Plus size={24} className="text-muted-foreground" />
      </Pressable>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Nhập tin nhắn..."
        placeholderTextColor="#64748B"
        returnKeyType="send"
        onSubmitEditing={handleSend}
        className="h-12 flex-1 rounded-full border border-border bg-background px-5 font-default text-[14px] text-foreground"
      />
      <Pressable
        onPress={handleSend}
        accessibilityRole="button"
        accessibilityLabel="Gửi tin nhắn"
        className="items-center justify-center w-12 h-12 rounded-full shadow-sm bg-primary active:opacity-90"
      >
        <SendHorizontal size={20} color={"white"} />
      </Pressable>
    </View>
  );
}
