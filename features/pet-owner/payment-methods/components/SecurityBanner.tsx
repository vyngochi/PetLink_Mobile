import React from "react";
import { Text, View } from "react-native";
import { ShieldCheck } from "lucide-react-native";

import { Colors } from "@/constants/theme";

export function SecurityBanner() {
  return (
    <View className="flex-row items-start gap-4 rounded-2xl bg-muted p-5">
      <ShieldCheck size={24} color={Colors.light.tint} />
      <View className="flex-1">
        <Text className="mb-1 font-mbold text-[14px] leading-5 text-foreground">
          Thanh toán an toàn
        </Text>
        <Text className="font-default text-[14px] leading-[21px] text-muted-foreground">
          Thông tin thanh toán của bạn được mã hóa và không bao giờ lưu trên máy
          chủ của chúng tôi. PetLink sử dụng các giao thức bảo mật theo tiêu
          chuẩn ngành.
        </Text>
      </View>
    </View>
  );
}
