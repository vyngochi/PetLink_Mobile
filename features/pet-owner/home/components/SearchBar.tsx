import { Search } from 'lucide-react-native';
import React from 'react';
import { TextInput, View } from 'react-native';

export function SearchBar() {
  return (
    <View className="relative w-full mt-4">
      <View className="absolute inset-y-0 left-4 z-10 flex items-center justify-center pointer-events-none">
        <Search className="text-muted-foreground" size={20} />
      </View>
      <TextInput
        className="w-full bg-card border-border/50 border rounded-xl py-4 pl-12 pr-4 font-default text-foreground shadow-sm"
        placeholder="Tìm kiếm dịch vụ, phòng khám..."
        placeholderTextColor="#64748B"
      />
    </View>
  );
}
