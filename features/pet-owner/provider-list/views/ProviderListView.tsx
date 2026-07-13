import { Colors } from "@/constants/theme";
import { useDebounce } from "@/features/pet-owner/home/hooks/useDebounce";
import { Href, useRouter } from "expo-router";
import { Search, SlidersHorizontal, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { useGetCoors } from "../../home/hooks/useGetCoors";
import { useSearchStore } from "../../shared/stores/search.store";
import { ProviderCard } from "../components/ProviderCard";
import {
  FilterState,
  ProviderFilterModal,
} from "../components/ProviderFilterModal";
import { useGetProviders } from "../hooks/useGetProviders";

export function ProviderListView() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { coors } = useGetCoors();

  const { isNearMe, ...restFilters } = filters;
  const {
    providers,
    isLoading,
    isError,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetProviders({
    searchKey: debouncedQuery.trim() || undefined,
    ...restFilters,
    userLat: coors?.userLat,
    userLng: coors?.userLong,
  });

  const sortedProviders = useMemo(() => {
    if (!isNearMe) return providers;
    return [...providers].sort(
      (a, b) => a.location.distanceKm - b.location.distanceKm,
    );
  }, [providers, isNearMe]);

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
              className="w-full py-3 pl-12 pr-12 border shadow-sm bg-card border-border/50 rounded-xl font-default text-foreground"
              placeholder="Tên cơ sở, dịch vụ..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery("")}
                className="absolute inset-y-0 z-10 flex items-center justify-center p-2 right-2"
              >
                <X className="text-muted-foreground" size={20} />
              </Pressable>
            )}
          </View>
          <Pressable
            className="items-center justify-center w-12 h-12 border shadow-sm rounded-xl bg-card border-border/50 active:opacity-80"
            onPress={() => setFilterVisible(true)}
          >
            <SlidersHorizontal className="text-foreground" size={20} />
          </Pressable>
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
          data={sortedProviders}
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
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="items-center py-4">
                <ActivityIndicator size="small" color={Colors.light.tint} />
              </View>
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefetching && !isFetchingNextPage}
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

      <ProviderFilterModal
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        initialFilters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setFilterVisible(false);
        }}
      />
    </View>
  );
}
