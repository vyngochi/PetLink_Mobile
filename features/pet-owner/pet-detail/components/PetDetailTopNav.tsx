import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Trash2 } from "lucide-react-native";

import { Colors } from "@/constants/theme";

const DESTRUCTIVE_COLOR = "#ba1a1a";

type PetDetailTopNavProps = {
  onBack?: () => void;
  onDelete?: () => void;
  deleting?: boolean;
};

export function PetDetailTopNav({
  onBack,
  onDelete,
  deleting = false,
}: PetDetailTopNavProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      pointerEvents="box-none"
      className="absolute left-0 right-0 top-0 z-50"
    >
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.9 : 1 }],
          })}
          className="h-12 w-12 items-center justify-center rounded-full bg-background/80 shadow-lg"
        >
          <ChevronLeft size={24} color={Colors.light.text} />
        </Pressable>

        {onDelete ? (
          <Pressable
            onPress={onDelete}
            disabled={deleting}
            accessibilityRole="button"
            accessibilityLabel="Xoá thú cưng"
            style={({ pressed }) => ({
              transform: [{ scale: pressed && !deleting ? 0.9 : 1 }],
              opacity: deleting ? 0.6 : 1,
            })}
            className="h-12 w-12 items-center justify-center rounded-full bg-background/80 shadow-lg"
          >
            {deleting ? (
              <ActivityIndicator size="small" color={DESTRUCTIVE_COLOR} />
            ) : (
              <Trash2 size={22} color={DESTRUCTIVE_COLOR} />
            )}
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
