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
        <Stack.Screen name="my-pets" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="pet/[id]" />
        <Stack.Screen name="pet/[id]/edit" />
      </Stack.Protected>

      <Stack.Screen name="provider/[id]" />
    </Stack>
  );
}
