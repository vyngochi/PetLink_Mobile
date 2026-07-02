import { Check, CreditCard, Plus } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type {
  CardBrand,
  PaymentCard,
} from "@/features/pet-owner/payment-methods/types";
import { cn } from "@/lib/utils";

const BRAND_LABELS: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  generic: "Thẻ",
};

interface PaymentCardPickerProps {
  cards: PaymentCard[];
  selectedCardId: string | null;
  onSelect: (cardId: string) => void;
  onAddCard: () => void;
}

export function PaymentCardPicker({
  cards,
  selectedCardId,
  onSelect,
  onAddCard,
}: PaymentCardPickerProps) {
  return (
    <View className="gap-3">
      {cards.map((card) => {
        const selected = card.id === selectedCardId;

        return (
          <Pressable
            key={card.id}
            onPress={() => onSelect(card.id)}
            className={cn(
              "flex-row items-center gap-4 rounded-[20px] border-2 bg-card p-4 shadow-sm",
              selected ? "border-primary" : "border-border/50",
            )}
          >
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-muted/50">
              <CreditCard size={22} className="text-foreground" />
            </View>
            <View className="flex-1">
              <Text className="font-mbold text-[14px] text-foreground">
                {BRAND_LABELS[card.brand]} •••• {card.last4}
              </Text>
              <Text className="mt-0.5 font-default text-[12px] text-muted-foreground">
                Hết hạn {card.expiry}
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

      <Pressable
        onPress={onAddCard}
        className="flex-row items-center gap-4 rounded-[20px] border border-dashed border-border bg-card/50 p-4 active:opacity-80"
      >
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-muted/50">
          <Plus size={22} className="text-muted-foreground" />
        </View>
        <Text className="font-mbold text-[14px] text-foreground">
          Thêm thẻ mới
        </Text>
      </Pressable>
    </View>
  );
}
