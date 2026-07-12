import React, { useState } from 'react';
import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { Colors } from '@/constants/theme';

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

export function ProviderFilterModal({ visible, onClose, initialFilters, onApply }: ProviderFilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const DEFAULT_MAX_PRICE = 5000000;
  
  const [priceRange, setPriceRange] = useState<number[]>([
    initialFilters.minPrice ?? 0,
    initialFilters.maxPrice ?? DEFAULT_MAX_PRICE
  ]);

  // Update internal state when opened
  React.useEffect(() => {
    if (visible) {
      setFilters(initialFilters);
      setPriceRange([
        initialFilters.minPrice ?? 0,
        initialFilters.maxPrice ?? DEFAULT_MAX_PRICE
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
    { label: 'Tất cả', value: undefined },
    { label: 'Từ 4 sao', value: 4 },
    { label: 'Từ 3 sao', value: 3 },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-background rounded-t-3xl pt-6 pb-8 px-5" style={{ maxHeight: '80%' }}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-mbold text-foreground">Bộ lọc</Text>
            <Pressable onPress={onClose} className="p-2 rounded-full bg-surface-container">
              <X size={20} className="text-foreground" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-6">
            <Text className="font-mbold text-foreground mb-3 text-lg">Đánh giá</Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {RATING_OPTIONS.map((opt, i) => {
                const isActive = filters.minRating === opt.value;
                return (
                  <Pressable
                    key={i}
                    onPress={() => setFilters({ ...filters, minRating: opt.value, maxRating: undefined })}
                    className={`px-4 py-2 rounded-xl border ${
                      isActive ? 'bg-primary border-primary' : 'bg-card border-border/50'
                    }`}
                  >
                    <Text className={`font-default ${isActive ? 'text-white' : 'text-foreground'}`}>
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="font-mbold text-foreground text-lg">Khoảng giá</Text>
              <Text className="font-default text-primary">
                {priceRange[0].toLocaleString('vi-VN')}đ - {priceRange[1] === DEFAULT_MAX_PRICE ? '5.000.000+ đ' : priceRange[1].toLocaleString('vi-VN') + 'đ'}
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
                thumbStyle={{ width: 24, height: 24, borderRadius: 12, borderWidth: 3, borderColor: '#fff' }}
              />
            </View>

            <View className="flex-row items-center justify-between mb-4 mt-2 px-1">
              <Text className="font-mbold text-foreground text-lg">Gần bạn nhất</Text>
              <Pressable
                onPress={() => setFilters({ ...filters, isNearMe: !filters.isNearMe })}
                className={`w-14 h-8 rounded-full justify-center px-1 transition-colors ${
                  filters.isNearMe ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                    filters.isNearMe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </Pressable>
            </View>
          </ScrollView>

          <View className="flex-row gap-3 pt-4 border-t border-border/30">
            <Pressable 
              onPress={handleReset}
              className="flex-1 py-4 items-center justify-center rounded-xl bg-surface-container"
            >
              <Text className="font-mbold text-foreground">Thiết lập lại</Text>
            </Pressable>
            <Pressable 
              onPress={handleApply}
              className="flex-[2] py-4 items-center justify-center rounded-xl bg-primary"
            >
              <Text className="font-mbold text-white">Áp dụng</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
