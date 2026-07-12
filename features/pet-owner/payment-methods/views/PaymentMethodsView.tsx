import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import {
  AddCardButton,
  OtherMethodRow,
  PaymentCard,
  PaymentMethodsHeader,
  SecurityBanner,
} from "@/features/pet-owner/payment-methods/components";
import { usePaymentMethods } from "@/features/pet-owner/payment-methods/hooks/usePaymentMethods";

export function PaymentMethodsView() {
  const router = useRouter();
  const { cards: initialCards, otherMethods } = usePaymentMethods();
  const [cards, setCards] = useState(initialCards);

  const handleSetPrimary = (cardId: string) => {
    setCards((prev) =>
      prev.map((card) => ({ ...card, isPrimary: card.id === cardId })),
    );
  };

  const handleAddPaymentMethod = () => {
    router.push("/pet-owner/add-payment-method");
  };

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
            Thẻ của bạn
          </Text>
          <View className="gap-4">
            {cards.map((card) => (
              <PaymentCard
                key={card.id}
                card={card}
                onSetPrimary={(selected) => handleSetPrimary(selected.id)}
              />
            ))}
            <AddCardButton onPress={handleAddPaymentMethod} />
          </View>
        </View>

        <View className="mb-8">
          <Text className="mb-4 font-mbold text-[18px] leading-6 text-foreground">
            Phương thức khác
          </Text>
          <View className="gap-3">
            {otherMethods.map((method) => (
              <OtherMethodRow key={method.id} method={method} />
            ))}
          </View>
        </View>

        <SecurityBanner />
      </ScrollView>

      <View className="px-5 pt-3">
        <Pressable
          onPress={handleAddPaymentMethod}
          accessibilityRole="button"
          accessibilityLabel="Thêm phương thức thanh toán"
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
          className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-primary shadow-sm"
        >
          <Plus size={20} color={Colors.light.background} />
          <Text className="font-mbold text-[16px] leading-6 text-primary-foreground">
            Thêm phương thức thanh toán
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
