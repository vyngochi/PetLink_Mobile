import {
  CircleCheck,
  CircleX,
  Info,
  type LucideIcon,
} from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

import {
  useToastStore,
  type Toast,
  type ToastVariant,
} from "@/components/toast/toast.store";

const variantConfig: Record<
  ToastVariant,
  { container: string; icon: LucideIcon }
> = {
  success: { container: "bg-primary", icon: CircleCheck },
  error: { container: "bg-destructive", icon: CircleX },
  info: { container: "bg-secondary", icon: Info },
};

type ToastItemProps = {
  toast: Toast;
};

export function ToastItem({ toast }: ToastItemProps) {
  const dismiss = useToastStore((s) => s.dismiss);
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dismiss]);

  return (
    <Animated.View
      entering={FadeInDown.duration(220)}
      exiting={FadeOutUp.duration(180)}
      className="mb-2"
      style={{
        shadowColor: "#0b1c30",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      <Pressable
        onPress={() => dismiss(toast.id)}
        accessibilityRole="alert"
        className={`flex-row items-center gap-3 rounded-2xl px-4 py-3.5 ${config.container}`}
      >
        <Icon size={20} color="#ffffff" />
        <Text className="flex-1 font-mbold text-[14px] leading-5 text-white">
          {toast.message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
