import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export interface AuthFooterLinkProps {
  readonly prompt: string;
  readonly action: string;
  readonly onPress?: () => void;
  readonly className?: string;
}

/** "Don't have an account? Register" style footer with a tappable action. */
export function AuthFooterLink({
  prompt,
  action,
  onPress,
  className,
}: AuthFooterLinkProps) {
  return (
    <View className={cn("flex-row items-center justify-center", className)}>
      <Text className="text-sm text-muted-foreground">{prompt} </Text>
      <Pressable onPress={onPress} hitSlop={8}>
        <Text className="text-sm font-bold text-primary">{action}</Text>
      </Pressable>
    </View>
  );
}
