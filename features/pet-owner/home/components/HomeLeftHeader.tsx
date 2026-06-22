import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const avatarPlaceholder = require("@/assets/images/PetLink/PetLink.png");

export default function HomeLeftHeader() {
  const router = useRouter();
  const { isAuthenticated: isLogged } = useAuth();
  return (
    <View>
      {!isLogged ? (
        <Button onPress={() => router.push({ pathname: "/(auth)/login" })}>
          <Text className="text-white font-mbold">Bắt đầu</Text>
        </Button>
      ) : (
        <View className="p-0.5 border-primary border-2 rounded-full">
          <Image
            source={avatarPlaceholder}
            style={{ width: 40, height: 40 }}
            contentFit="cover"
          />
        </View>
      )}
    </View>
  );
}
