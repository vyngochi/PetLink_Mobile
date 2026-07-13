import { snakeCaseFormat } from "@/lib/helper/formatText";
import { useRouter } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSearchStore } from "../../shared/stores/search.store";
import { mapIcon } from "../utils/mapIcon";
import { mapName } from "../utils/mapName";

export function QuickServiceItem({
  service,
  onSelect,
}: {
  service: string;
  onSelect: (v: string) => void;
}) {
  const item = snakeCaseFormat(service);
  const iconName = mapIcon(item);
  const itemName = mapName(item);

  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  return (
    <Pressable
      onPress={() => onSelect(item)}
      className="flex-col items-center gap-2 min-w-[72px] active:scale-95 transition-all"
    >
      <View
        className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border border-primary`}
      >
        <Icon size={32} color={"green"} />
      </View>
      <Text className="text-xs font-label-sm text-muted-foreground">
        {itemName}
      </Text>
    </Pressable>
  );
}

export function QuickServicesSection({ services }: { services: string[] }) {
  const { setSearchQuery } = useSearchStore();
  const router = useRouter();

  const onSelect = (v: string) => {
    setSearchQuery(v);
    router.push("/(tabs)/providers");
  };
  return (
    <View className="mt-6">
      <Text className="mb-4 text-lg font-headline-sm text-foreground font-mbold">
        Dịch vụ nhanh
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8, gap: 16 }}
      >
        {services.map((service) => (
          <QuickServiceItem
            key={service}
            service={service}
            onSelect={onSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
}
