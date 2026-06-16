import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LogIn } from "lucide-react-native";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-margin-side">
        <Text className="mb-2 font-bold text-[28px] leading-9 text-on-background">
          Welcome to PetLink
        </Text>
        <Text className="mb-section-gap-lg text-center font-default text-[14px] leading-[21px] text-on-surface-variant">
          Log in to manage your pet&apos;s health and schedule.
        </Text>

        <Pressable
          onPress={() => router.push("/login")}
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.97 : 1 }],
            shadowColor: "#006e1c",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 4,
          })}
          className="h-touch-target w-full flex-row items-center justify-center gap-2 rounded-full bg-primary-deep px-6"
        >
          <LogIn size={20} color="#ffffff" />
          <Text className="font-semibold text-[16px] leading-5 text-on-primary">
            Log In
          </Text>
        </Pressable>

        <View className="mt-element-gap flex-row items-center justify-center">
          <Text className="font-default text-[14px] leading-[21px] text-on-surface-variant">
            Don&apos;t have an account?{" "}
          </Text>
          <Pressable hitSlop={8} onPress={() => router.push("/register")}>
            <Text className="font-semibold text-[14px] leading-[21px] text-primary-deep">
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
