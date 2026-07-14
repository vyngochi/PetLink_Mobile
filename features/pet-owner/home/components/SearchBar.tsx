import { Href, useRouter } from "expo-router";
import { Search, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSearchStore } from "../../shared/stores/search.store";
import { useDebounce } from "../hooks/useDebounce";
import { useGlobalSearch } from "../hooks/useGlobalSearch";

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
  };

  const handleSelectProvider = (id: string, name: string) => {
    setSearchQuery(name);
    setInputText(name);
    setIsFocused(false);
    router.push(`/pet-owner/provider/${id}` as Href);
  };

  const handleSelectService = (id: string, name: string) => {
    setSearchQuery(name);
    setInputText(name);
    setIsFocused(false);
    router.push(`/pet-owner/services/${id}` as Href);
  };

  const showSuggestions = isFocused && inputText.length > 0;
  const hasResults =
    data && (data.providers.length > 0 || data.services.length > 0);

  return (
    <View className="relative z-50 w-full mt-4">
      <View className="absolute inset-y-0 z-10 flex items-center justify-center pointer-events-none left-4">
        <Search className="text-muted-foreground" size={20} />
      </View>
      <TextInput
        className="w-full py-4 pl-12 pr-12 border shadow-sm bg-card border-border/50 rounded-xl font-default text-foreground"
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
      {inputText.length > 0 && (
        <Pressable
          onPress={() => setInputText("")}
          className="absolute inset-y-0 right-2 z-10 flex items-center justify-center p-2"
        >
          <X className="text-muted-foreground" size={20} />
        </Pressable>
      )}

      {showSuggestions && (
        <View
          className="absolute left-0 right-0 z-50 mt-2 overflow-hidden border shadow-lg top-full bg-card border-border/50 rounded-xl max-h-64"
          style={{ elevation: 5 }}
        >
          {isLoading ? (
            <View className="items-center justify-center p-4">
              <ActivityIndicator size="small" />
            </View>
          ) : hasResults ? (
            <ScrollView keyboardShouldPersistTaps="handled">
              {data.providers.map((provider, index) => (
                <Pressable
                  key={`provider-${index}`}
                  className="px-4 py-3 border-b border-border/30 active:bg-muted/50"
                  onPress={() =>
                    handleSelectProvider(provider.id, provider.name)
                  }
                >
                  <Text className="font-mbold text-foreground">
                    {provider.name}
                  </Text>
                  <Text className="mt-1 text-xs text-muted-foreground">
                    Cơ sở
                  </Text>
                </Pressable>
              ))}
              {data.services.map((service, index) => (
                <Pressable
                  key={`service-${index}`}
                  className="px-4 py-3 border-b border-border/30 active:bg-muted/50"
                  onPress={() => handleSelectService(service.id, service.name)}
                >
                  <Text className="font-mbold text-foreground">
                    {service.name}
                  </Text>
                  <Text className="mt-1 text-xs text-muted-foreground">
                    Dịch vụ
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <View className="items-center justify-center p-4">
              <Text className="text-sm text-muted-foreground font-default">
                Không tìm thấy kết quả
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
