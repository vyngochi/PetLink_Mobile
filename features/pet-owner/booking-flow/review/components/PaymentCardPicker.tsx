import { Check } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import type { PaymentMethod } from "@/features/pet-owner/payment-methods/types";
import { cn } from "@/lib/utils";

interface PaymentCardPickerProps {
  methods: PaymentMethod[];
  selectedMethodId: string | null;
  onSelect: (methodId: string) => void;
  onChangeMethod?: () => void;
}

export function PaymentCardPicker({
  methods,
  selectedMethodId,
  onSelect,
  onChangeMethod,
}: PaymentCardPickerProps) {
  return (
    <View className="gap-3">
      {methods.map((method) => {
        const selected = method.id === selectedMethodId;

        return (
          <Pressable
            key={method.id}
            onPress={() => onSelect(method.id)}
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
  );
}
