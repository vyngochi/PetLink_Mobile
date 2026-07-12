import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { TextInput, View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import { useSearchStore } from '../../shared/stores/search.store';
import { useDebounce } from '../hooks/useDebounce';

export function SearchBar() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(inputText, 300);
  
  const { data, isLoading } = useGlobalSearch(debouncedQuery);
  const { setSearchQuery } = useSearchStore();

  const handleSelect = (query: string) => {
    setSearchQuery(query);
    setInputText(query);
    setIsFocused(false);
    router.push("/(tabs)/providers");
  };

  const showSuggestions = isFocused && inputText.length > 0;
  const hasResults = data && (data.providers.length > 0 || data.services.length > 0);

  return (
    <View className="relative w-full mt-4 z-50">
      <View className="absolute inset-y-0 left-4 z-10 flex items-center justify-center pointer-events-none">
        <Search className="text-muted-foreground" size={20} />
      </View>
      <TextInput
        className="w-full bg-card border-border/50 border rounded-xl py-4 pl-12 pr-4 font-default text-foreground shadow-sm"
        placeholder="Tìm kiếm dịch vụ, phòng khám..."
        placeholderTextColor="#64748B"
        value={inputText}
        onChangeText={setInputText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 200);
        }}
        onSubmitEditing={() => {
          if (inputText) {
            handleSelect(inputText);
          }
        }}
      />
      
      {showSuggestions && (
        <View className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-lg max-h-64 overflow-hidden z-50" style={{ elevation: 5 }}>
          {isLoading ? (
            <View className="p-4 items-center justify-center">
              <ActivityIndicator size="small" />
            </View>
          ) : hasResults ? (
            <ScrollView keyboardShouldPersistTaps="handled">
              {data.providers.map((provider, index) => (
                <Pressable
                  key={`provider-${index}`}
                  className="px-4 py-3 border-b border-border/30 active:bg-muted/50"
                  onPress={() => handleSelect(provider)}
                >
                  <Text className="font-mbold text-foreground">{provider}</Text>
                  <Text className="text-xs text-muted-foreground mt-1">Cơ sở</Text>
                </Pressable>
              ))}
              {data.services.map((service, index) => (
                <Pressable
                  key={`service-${index}`}
                  className="px-4 py-3 border-b border-border/30 active:bg-muted/50"
                  onPress={() => handleSelect(service)}
                >
                  <Text className="font-mbold text-foreground">{service}</Text>
                  <Text className="text-xs text-muted-foreground mt-1">Dịch vụ</Text>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <View className="p-4 items-center justify-center">
              <Text className="text-muted-foreground font-default text-sm">Không tìm thấy kết quả</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
