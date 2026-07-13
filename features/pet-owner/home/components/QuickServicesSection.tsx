import * as LucideIcons from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { QuickServiceType } from "../types/home.type";

export function QuickServiceItem({ service }: { service: QuickServiceType }) {
  const Icon = (LucideIcons as any)[service.iconName] || LucideIcons.HelpCircle;

  return (
    <Pressable className="flex-col items-center gap-2 min-w-[72px] active:scale-95 transition-all">
      <View
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${service.bgColorClass}`}
      >
        <Icon className={service.textColorClass} size={32} />
      </View>
      <Text className="font-label-sm text-xs text-muted-foreground">
        {service.name}
      </Text>
    </Pressable>
  );
}

export function QuickServicesSection({
  services,
}: {
  services: QuickServiceType[];
}) {
  return (
    <View className="mt-6">
      <Text className="font-headline-sm text-lg text-foreground mb-4 font-mbold">
        Dịch vụ nhanh
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8, gap: 16 }}
      >
        {services.map((service) => (
          <QuickServiceItem key={service.id} service={service} />
        ))}
      </ScrollView>
    </View>
  );
}
