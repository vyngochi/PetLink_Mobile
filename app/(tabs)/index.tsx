import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LogIn } from "lucide-react-native";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-2 font-bold text-[28px] leading-9 text-foreground">
          Welcome to PetLink
        </Text>
        <Text className="mb-10 text-center font-default text-[14px] leading-[21px] text-muted-foreground">
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
          className="h-12 w-full flex-row items-center justify-center gap-2 rounded-full bg-primary px-6"
        >
          <LogIn size={20} color="#ffffff" />
          <Text className="font-semibold text-[16px] leading-5 text-primary-foreground">
            Log In
          </Text>
        </Pressable>

        <View className="mt-4 flex-row items-center justify-center">
          <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
            Don&apos;t have an account?{" "}
          </Text>
          <Pressable hitSlop={8} onPress={() => router.push("/register")}>
            <Text className="font-semibold text-[14px] leading-[21px] text-primary">
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
