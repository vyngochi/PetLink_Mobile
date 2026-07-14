import { Colors } from "@/constants/theme";
import { Slider } from "@miblanchard/react-native-slider";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Switch, Text, View } from "react-native";

export interface FilterState {
  minRating?: number;
  maxRating?: number;
  minPrice?: number;
  maxPrice?: number;
  isNearMe?: boolean;
}

interface ProviderFilterModalProps {
  visible: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApply: (filters: FilterState) => void;
}

export function ProviderFilterModal({
  visible,
  onClose,
  initialFilters,
  onApply,
}: ProviderFilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const DEFAULT_MAX_PRICE = 5000000;

  const [priceRange, setPriceRange] = useState<number[]>([
    initialFilters.minPrice ?? 0,
    initialFilters.maxPrice ?? DEFAULT_MAX_PRICE,
  ]);

  // Update internal state when opened
  React.useEffect(() => {
    if (visible) {
      setFilters(initialFilters);
      setPriceRange([
        initialFilters.minPrice ?? 0,
        initialFilters.maxPrice ?? DEFAULT_MAX_PRICE,
      ]);
    }
  }, [visible, initialFilters]);

  const handleApply = () => {
    onApply({
      ...filters,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < DEFAULT_MAX_PRICE ? priceRange[1] : undefined,
    });
  };

  const handleReset = () => {
    setFilters({});
    setPriceRange([0, DEFAULT_MAX_PRICE]);
  };

  const RATING_OPTIONS = [
    { label: "Tất cả", value: undefined },
    { label: "Từ 5 sao", value: 5 },
    { label: "Từ 4 sao", value: 4 },
    { label: "Từ 3 sao", value: 3 },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="justify-end flex-1 bg-black/50">
        <View
          className="px-5 pt-6 pb-8 bg-background rounded-t-3xl"
          style={{ maxHeight: "80%" }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-mbold text-foreground">Bộ lọc</Text>
            <Pressable
              onPress={onClose}
              className="p-2 rounded-full bg-surface-container"
            >
              <X size={20} className="text-foreground" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-6">
            <Text className="mb-3 text-lg font-mbold text-foreground">
              Đánh giá
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {RATING_OPTIONS.map((opt, i) => {
                const isActive = filters.minRating === opt.value;
                return (
                  <Pressable
                    key={i}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        minRating: opt.value,
                        maxRating: undefined,
                      })
                    }
                    className={`px-2 py-2 rounded-xl border ${
                      isActive
                        ? "bg-primary border-primary"
                        : "bg-card border-border/50"
                    }`}
                  >
                    <Text
                      className={`font-default ${isActive ? "text-white" : "text-foreground"}`}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-mbold text-foreground">
                Khoảng giá
              </Text>
              <Text className="font-default text-primary">
                {priceRange[0].toLocaleString("vi-VN")}đ -{" "}
                {priceRange[1] === DEFAULT_MAX_PRICE
                  ? "5.000.000+ đ"
                  : priceRange[1].toLocaleString("vi-VN") + "đ"}
              </Text>
            </View>
            <View className="px-2 mb-4">
              <Slider
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as number[])}
                minimumValue={0}
                maximumValue={DEFAULT_MAX_PRICE}
                step={50000}
                minimumTrackTintColor={Colors.light.tint}
                maximumTrackTintColor="#E2E8F0"
                thumbTintColor={Colors.light.tint}
                trackStyle={{ height: 6, borderRadius: 3 }}
                thumbStyle={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 3,
                  borderColor: "#fff",
                }}
              />
            </View>

            <View className="flex-row items-center justify-between px-1 mt-2 mb-4">
              <Text className="text-lg font-mbold text-foreground">
                Gần bạn nhất
              </Text>
              <Switch
                value={!!filters.isNearMe}
                onValueChange={(val) =>
                  setFilters({ ...filters, isNearMe: val })
                }
                trackColor={{ false: "#E2E8F0", true: Colors.light.tint }}
                thumbColor="#ffffff"
              />
            </View>
          </ScrollView>

          <View className="flex-row gap-3 pt-4 border-t border-border/30">
            <Pressable
              onPress={handleReset}
              className="items-center justify-center flex-1 py-4 rounded-xl bg-surface-container"
            >
              <Text className="font-mbold text-foreground">Thiết lập lại</Text>
            </Pressable>
            <Pressable
              onPress={handleApply}
              className="flex-[2] py-4 items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-white font-mbold">Áp dụng</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
