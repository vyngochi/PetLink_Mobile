import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import {
  PaymentMethodsHeader,
  SecurityBanner,
} from "@/features/pet-owner/payment-methods/components";
import { usePaymentMethods } from "@/features/pet-owner/payment-methods/hooks/usePaymentMethods";
import { cn } from "@/lib/utils";

export function PaymentMethodsView() {
  const router = useRouter();
  const { methods, toggleMethod, isLoading } = usePaymentMethods();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="px-5">
        <PaymentMethodsHeader
          title="Phương thức thanh toán"
          onBack={() => router.back()}
        />
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-8 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="mb-4 font-mbold text-[18px] leading-6 text-foreground">
            Lựa chọn của bạn
          </Text>
          <View className="gap-4">
            {methods.map((method) => {
              const selected = method.isEnabled;
              return (
                <Pressable
                  key={method.id}
                  onPress={() => toggleMethod(method.id)}
                  className={cn(
                    "flex-row items-center gap-4 rounded-[20px] border-2 bg-card p-4 shadow-sm",
                    selected ? "border-primary" : "border-border/50",
                  )}
                >
                  <View
                    className={cn(
                      "h-11 w-11 items-center justify-center rounded-xl",
                      method.iconBgClass || "bg-muted/50",
                    )}
                  >
                    {(() => {
                      if (method.icon) {
                        const Icon = method.icon;
                        return <Icon size={22} color="#ffffff" />;
                      }
                      if (method.image) {
                        return (
                          <Image
                            source={method.image}
                            className="h-11 w-11 rounded-xl"
                            resizeMode="cover"
                          />
                        );
                      }
                      return null;
                    })()}
                  </View>
                  <View className="flex-1">
                    <Text className="font-mbold text-[15px] text-foreground">
                      {method.name}
                    </Text>
                  </View>
                  {selected ? (
                    <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <Check size={14} color="#ffffff" strokeWidth={3} />
                    </View>
                  ) : (
                    <View className="h-6 w-6 rounded-full border-2 border-border" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <SecurityBanner />
      </ScrollView>
    </SafeAreaView>
  );
}
