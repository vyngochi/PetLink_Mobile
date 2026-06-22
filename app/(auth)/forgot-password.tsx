import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthBackground, AuthHeader } from "@/features/authentication/components";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <AuthBackground />
      <View className="flex-1 px-6 pt-4">
        <Pressable
          hitSlop={8}
          onPress={() => router.back()}
          className="flex-row items-center gap-1 self-start"
        >
          <ArrowLeft size={20} color="#6b7280" />
          <Text className="font-mbold text-[14px] leading-5 text-muted-foreground">
            Quay lại
          </Text>
        </Pressable>

        <View className="flex-1 items-center justify-center">
          <View className="mb-8">
            <AuthHeader size={130} />
          </View>
          <Text className="mb-3 text-center font-mbold text-[24px] leading-8 text-foreground">
            Quên mật khẩu
          </Text>
          <Text className="px-4 text-center font-default text-[14px] leading-[21px] text-muted-foreground">
            Tính năng đặt lại mật khẩu đang được phát triển. Vui lòng liên hệ hỗ
            trợ nếu bạn cần khôi phục tài khoản.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
