import React from "react";
import { Text, View } from "react-native";
import { PawPrint } from "lucide-react-native";

type AuthHeaderProps = {
  /** Render the brand mark inside a tonal rounded container (login uses a larger badge). */
  badgeSize?: number;
};

/** PetLink brand mark: a tonal paw badge above the wordmark. */
export function AuthHeader({ badgeSize = 64 }: AuthHeaderProps) {
  return (
    <View className="items-center">
      <View
        className="mb-4 items-center justify-center rounded-[20px] bg-primary-container"
        style={{
          width: badgeSize,
          height: badgeSize,
          shadowColor: "#4caf50",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 6,
        }}
      >
        <PawPrint size={badgeSize * 0.5} color="#003c0b" strokeWidth={2.2} />
      </View>
      <Text className="font-bold text-[24px] leading-8 text-primary-deep">
        PetLink
      </Text>
    </View>
  );
}
