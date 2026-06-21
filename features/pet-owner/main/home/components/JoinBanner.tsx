import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

interface JoinBannerProps {
  onJoinPress?: () => void;
}

export function JoinBanner({ onJoinPress }: JoinBannerProps) {
  return (
    <View className="relative w-full h-64 mt-8 overflow-hidden shadow-lg rounded-3xl bg-card">
      <ImageBackground
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIrhtd0Pl1uCHOhHk_sqbpTFwMObL0Og730qEW7FGT5LpvDcnLgFACFHSadzhH-JgMmhxi_IvHuTs9ZIlJFCdY-Zh7l-zxwBrSXin07dYAvy_TiGVPKae0I5XiWic5dQr4l8G5WnP5ZdfBu4IqEPyLI-2FiIDILGoIXlMppAOrO4BDyy-HHmEcMd20Kxfmvv2ymnkXgkbGX8tyiFUo6ekc-kT3BxNCGfau-Gizqq_g_BlDmqzHIp39bS7b3q1LQGeahT8Db47fEGNF",
        }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute inset-0 z-10 flex-col justify-center px-8 bg-black/50">
        <Text className="font-mbold text-white text-3xl mb-2 max-w-[240px]">
          Tham gia PetLink
        </Text>
        <Text className="font-default text-white/90 text-sm mb-6 max-w-[220px]">
          Kết nối thú cưng của bạn với sự quan tâm tốt nhất
        </Text>
        <Pressable
          onPress={onJoinPress}
          className="self-start w-4/5 px-6 py-3 rounded-full bg-primary active:opacity-90"
        >
          <Text className="text-center text-primary-foreground font-mbold">
            Tham Gia Ngay
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
