import React from "react";
import { Pressable, Text, View } from "react-native";
import { CreditCard } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import type { PaymentCard as PaymentCardType } from "@/features/pet-owner/payment-methods/types";

type PaymentCardProps = {
  card: PaymentCardType;
  onSetPrimary?: (card: PaymentCardType) => void;
};

export function PaymentCard({ card, onSetPrimary }: PaymentCardProps) {
  return (
    <View className="flex-row items-center justify-between rounded-[16px] border border-border bg-card p-4 shadow-sm">
      <View className="flex-row items-center gap-4">
        <View className="h-8 w-12 items-center justify-center rounded-md border border-border bg-muted">
          <CreditCard
            size={20}
            color={card.isPrimary ? Colors.light.tint : Colors.light.icon}
          />
        </View>
        <View>
          <Text className="font-mbold text-[14px] leading-5 text-foreground">
            **** {card.last4}
          </Text>
          <Text className="font-default text-[12px] leading-4 text-muted-foreground">
            HSD: {card.expiry}
          </Text>
        </View>
      </View>

      {card.isPrimary ? (
        <View className="rounded-full bg-primary/10 px-3 py-1">
          <Text className="font-mbold text-[12px] leading-4 text-primary">
            Chính
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={() => onSetPrimary?.(card)}
          accessibilityRole="button"
          accessibilityLabel={`Đặt thẻ **** ${card.last4} làm thẻ chính`}
          hitSlop={8}
        >
          <Text className="font-mbold text-[14px] leading-5 text-primary">
            Đặt làm chính
          </Text>
        </Pressable>
      )}
    </View>
  );
}
