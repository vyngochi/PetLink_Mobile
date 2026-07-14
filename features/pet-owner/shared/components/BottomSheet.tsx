import { X } from "lucide-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

type BottomSheetProps = {
  visible: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  closeDisabled?: boolean;
  children: React.ReactNode;
};

export function BottomSheet({
  visible,
  title,
  subtitle,
  onClose,
  closeDisabled = false,
  children,
}: BottomSheetProps) {
  const handleClose = () => {
    if (closeDisabled) return;
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 justify-end bg-black/50">
          <Pressable
            className="flex-1"
            accessibilityRole="button"
            accessibilityLabel="Đóng"
            onPress={handleClose}
          />

          <View className="max-h-[85%] rounded-t-3xl bg-background px-5 pb-8 pt-6">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="font-mbold text-xl text-foreground">{title}</Text>
              <Pressable
                onPress={handleClose}
                disabled={closeDisabled}
                accessibilityRole="button"
                accessibilityLabel="Đóng"
                className="h-9 w-9 items-center justify-center rounded-full bg-muted active:opacity-70"
              >
                <X size={18} className="text-foreground" />
              </Pressable>
            </View>

            {subtitle ? (
              <Text className="font-default text-[14px] leading-5 text-muted-foreground">
                {subtitle}
              </Text>
            ) : null}

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
              contentContainerClassName="pt-5"
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
