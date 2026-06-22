import React from 'react';
import { ScrollView, Text, Pressable, View } from 'react-native';

interface ReviewFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ReviewFilter({ filters, activeFilter, onFilterChange }: ReviewFilterProps) {
  return (
    <View className="py-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              onPress={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-full border ${
                isActive ? 'bg-primary border-primary' : 'bg-card border-border/50'
              }`}
            >
              <Text
                className={`text-sm font-mbold ${
                  isActive ? 'text-white' : 'text-foreground'
                }`}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
