import { Stack } from "expo-router";
import React from "react";

export default function PetOwnerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f8f9ff" },
      }}
    >
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="provider/[id]" />
    </Stack>
  );
}
