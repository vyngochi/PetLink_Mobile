import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CommonHeaderProps {
  LeftContent?: React.ReactNode;
  RightContent?: React.ReactNode;
}
export default function CommonHeader({
  LeftContent = <LogoContent />,
  RightContent,
}: CommonHeaderProps) {
  return (
    <SafeAreaView edges={["top"]} className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        {LeftContent}
        {RightContent}
      </View>
    </SafeAreaView>
  );
}

const LogoContent = () => {
  const url = "./../assets/images/PetLink/PetLink.png";
  return (
    <View>
      <Image
        source={require(url)}
        style={{ width: 70, height: 50 }}
        contentFit="cover"
      />
    </View>
  );
};
