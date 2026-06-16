import React from "react";
import { View } from "react-native";

/**
 * Soft atmospheric blobs behind the auth screens. React Native has no cheap
 * blur primitive, so we approximate the mockup's diffused spheres with large,
 * very low-opacity rounded circles. Purely decorative, so it ignores touches.
 */
export function AuthBackground() {
  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      <View className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-primary-container/15" />
      <View className="absolute -bottom-32 -left-28 h-[22rem] w-[22rem] rounded-full bg-secondary-container/15" />
    </View>
  );
}
