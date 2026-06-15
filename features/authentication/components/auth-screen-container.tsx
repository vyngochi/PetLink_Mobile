import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

export interface AuthScreenContainerProps {
  readonly children: React.ReactNode;
  /** Override the content padding (defaults to `px-5 py-8`). */
  readonly contentClassName?: string;
}

/**
 * Shared shell for authentication screens: themed background, soft atmospheric
 * accents, keyboard avoidance and a scrollable, safe-area aware content area
 * with the 20px side margins from the design system.
 */
export function AuthScreenContainer({
  children,
  contentClassName,
}: AuthScreenContainerProps) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Soft atmospheric accents (replaces the web blur spheres) */}
      <View
        pointerEvents="none"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10"
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName={cn("flex-grow px-5 py-8", contentClassName)}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
