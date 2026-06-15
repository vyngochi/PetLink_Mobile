import { View } from "react-native";

import { Text } from "@/components/ui/text";

export interface AuthDividerProps {
  readonly text: string;
}

/** Horizontal rule with centered caption, e.g. "or continue with". */
export function AuthDivider({ text }: AuthDividerProps) {
  return (
    <View className="flex-row items-center gap-4">
      <View className="h-px flex-1 bg-border" />
      <Text className="text-xs text-muted-foreground">{text}</Text>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
