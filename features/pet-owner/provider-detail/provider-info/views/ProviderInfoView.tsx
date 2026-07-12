import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_PROVIDERS } from "../../../provider-list/constants/provider-mock";
import { ProviderAboutSection } from "../components/ProviderAboutSection";
import { ProviderReviewsSection } from "../components/ProviderReviewsSection";

interface ProviderInfoViewProps {
  providerId: string;
}

export function ProviderInfoView({ providerId }: ProviderInfoViewProps) {
  const router = useRouter();

  const provider = MOCK_PROVIDERS.find((p) => p.id === providerId);

  if (!provider) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <Text className="text-lg text-muted-foreground font-mbold">
          Không tìm thấy thông tin cơ sở
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="px-4 py-2 mt-4 rounded-full bg-primary"
        >
          <Text className="text-white font-mbold">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView
        edges={["top"]}
        className="border-b bg-surface-container-lowest border-border/50"
      >
        <View className="flex-row items-center gap-3 px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="flex items-center justify-center w-10 h-10 border rounded-full bg-card border-border/50 active:bg-muted"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>

          <View className="flex-row items-center flex-1 gap-3">
            <Image
              source={{ uri: provider.avatarUrl }}
              className="w-10 h-10 border rounded-full border-border/50"
              resizeMode="cover"
            />
            <View>
              <Text className="text-base font-mbold text-foreground line-clamp-1">
                {provider.businessName}
              </Text>
              <Text className="text-xs text-muted-foreground font-default">
                Thông tin & Đánh giá
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProviderAboutSection provider={provider} />

        <View className="w-full h-2 bg-muted/30" />

        <ProviderReviewsSection providerId={providerId} />
      </ScrollView>
    </View>
  );
}
