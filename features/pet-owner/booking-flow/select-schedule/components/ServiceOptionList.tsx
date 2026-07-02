import { Scissors, Stethoscope } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

import type { BookingServiceOption } from "@/features/pet-owner/booking-flow/shared/types";
import { formatCurrency } from "@/features/pet-owner/booking-flow/shared/utils/currency";
import { cn } from "@/lib/utils";

interface ServiceOptionListProps {
  services: BookingServiceOption[];
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
}

export function ServiceOptionList({
  services,
  selectedServiceId,
  onSelect,
}: ServiceOptionListProps) {
  return (
    <View className="gap-3 px-5">
      {services.map((service) => {
        const selected = service.id === selectedServiceId;
        const Icon = service.kind === "medical" ? Stethoscope : Scissors;

        return (
          <Pressable
            key={service.id}
            onPress={() => onSelect(service.id)}
            className={cn(
              "flex-row items-center justify-between rounded-[20px] border-2 bg-card p-4 shadow-sm",
              selected ? "border-primary" : "border-border/50",
            )}
          >
            <View className="flex-1 flex-row items-center gap-3.5">
              <View
                className={cn(
                  "h-12 w-12 items-center justify-center rounded-xl",
                  selected ? "bg-primary/10" : "bg-muted/50",
                )}
              >
                <Icon
                  size={22}
                  className={selected ? "text-primary" : "text-muted-foreground"}
                />
              </View>
              <View className="flex-1">
                <Text className="font-mbold text-[15px] text-foreground">
                  {service.name}
                </Text>
                <Text
                  numberOfLines={1}
                  className="mt-0.5 font-default text-[12px] text-muted-foreground"
                >
                  {service.description}
                </Text>
              </View>
            </View>
            <Text
              className={cn(
                "ml-2 font-mbold text-[14px]",
                selected ? "text-primary" : "text-muted-foreground",
              )}
            >
              {formatCurrency(service.price)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
