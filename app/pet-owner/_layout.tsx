import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { Stack } from "expo-router";
import React from "react";

export default function PetOwnerLayout() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f8f9ff" },
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="edit-profile" />
      </Stack.Protected>

      <Stack.Screen name="provider/[id]" />
    </Stack>
  );
}
