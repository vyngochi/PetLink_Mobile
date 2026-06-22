import { Search, SlidersHorizontal } from "lucide-react-native";
import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { ProviderCard } from "../components/ProviderCard";
import { MOCK_PROVIDERS } from "../constants/provider-mock";

export function ProviderListView() {
  return (
    <View className="flex-1 bg-background">
      {/* Header & Search */}
      <View className="px-5 pt-6 pb-4 bg-surface-container-lowest">
        <Text className="mb-4 text-2xl font-mbold text-foreground">
          Tìm kiếm Dịch vụ
        </Text>
        <View className="flex-row gap-3">
          <View className="relative flex-1">
            <View className="absolute inset-y-0 z-10 items-center justify-center pointer-events-none left-4">
              <Search className="text-muted-foreground" size={20} />
            </View>
            <TextInput
              className="w-full py-3 pl-12 pr-4 border shadow-sm bg-card border-border/50 rounded-xl font-default text-foreground"
              placeholder="Tên cơ sở, dịch vụ..."
              placeholderTextColor="#64748B"
            />
          </View>
          <View className="items-center justify-center w-12 h-12 border shadow-sm rounded-xl bg-card border-border/50">
            <SlidersHorizontal className="text-foreground" size={20} />
          </View>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={MOCK_PROVIDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProviderCard provider={item} />}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
