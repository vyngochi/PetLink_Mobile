import { Colors } from "@/constants/theme";
import { Href, useRouter } from "expo-router";
import { Search, SlidersHorizontal } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { ProviderCard } from "../components/ProviderCard";
import { useCurrentCoords } from "../hooks/useCurrentCoords";
import { useGetProviders } from "../hooks/useGetProviders";
import { useSearchStore } from "../../shared/stores/search.store";

export function ProviderListView() {
  const router = useRouter();
  const coords = useCurrentCoords();
  const { searchQuery, setSearchQuery } = useSearchStore();
  
  const { providers, isLoading, isError, refetch, isRefetching } =
    useGetProviders({
      ...coords,
      q: searchQuery,
    });

  return (
    <View className="flex-1 bg-background">
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View className="items-center justify-center w-12 h-12 border shadow-sm rounded-xl bg-card border-border/50">
            <SlidersHorizontal className="text-foreground" size={20} />
          </View>
        </View>
      </View>

      {isLoading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      ) : isError ? (
        <View className="items-center justify-center flex-1 gap-4 px-5">
          <Text className="text-center text-muted-foreground font-default">
            Không thể tải danh sách cơ sở. Vui lòng thử lại.
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="px-6 py-3 rounded-xl bg-primary active:opacity-90"
          >
            <Text className="text-white font-mbold">Thử lại</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={providers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProviderCard
              provider={item}
              onPress={() =>
                router.push(`/pet-owner/provider/${item.id}` as Href)
              }
            />
          )}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={Colors.light.tint}
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <Text className="text-center text-muted-foreground font-default">
                Chưa có cơ sở nào.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
