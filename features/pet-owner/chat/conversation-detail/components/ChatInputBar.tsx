import { Plus, SendHorizontal } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

type ChatInputBarProps = {
  onSend: (text: string) => void;
  onAttach: () => void;
  disabled?: boolean;
};

export function ChatInputBar({ onSend, onAttach, disabled }: ChatInputBarProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (disabled || !text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <View className="flex-row items-center gap-3 px-4 py-3 border-t border-border/50 bg-card">
      <Pressable
        onPress={onAttach}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Đính kèm"
        className={`items-center justify-center rounded-full h-11 w-11 active:bg-muted ${disabled ? "opacity-50" : ""}`}
      >
        <Plus size={24} className="text-muted-foreground" />
      </Pressable>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={disabled ? "Không thể gửi tin nhắn" : "Nhập tin nhắn..."}
        placeholderTextColor="#64748B"
        returnKeyType="send"
        onSubmitEditing={handleSend}
        editable={!disabled}
        className={`h-12 flex-1 rounded-full border border-border bg-background px-5 font-default text-[14px] text-foreground ${disabled ? "opacity-50" : ""}`}
      />
      <Pressable
        onPress={handleSend}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Gửi tin nhắn"
        className={`items-center justify-center w-12 h-12 rounded-full shadow-sm bg-primary active:opacity-90 ${disabled ? "opacity-50" : ""}`}
      >
        <SendHorizontal size={20} color={"white"} />
      </Pressable>
    </View>
  );
}
