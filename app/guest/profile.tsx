import { Button } from "@/components/ui/button";
import { ArrowRight, CircleUserRound } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuestProfile() {
  return (
    <SafeAreaView className="items-center flex-1 gap-5">
      <View className="p-8 border-4 border-white rounded-full bg-background">
        <CircleUserRound size={50} color={"blue"} />
      </View>

      <Text className="font-mbold">Join The Community</Text>

      <Text className="font-default">
        Create an account to use our services and expert care
      </Text>

      <View>
        <Button size={"lg"} variant={"outline"}>
          <Text className="text-2xl font-mbold">Sign Up</Text>
          <ArrowRight />
        </Button>
      </View>
    </SafeAreaView>
  );
}
