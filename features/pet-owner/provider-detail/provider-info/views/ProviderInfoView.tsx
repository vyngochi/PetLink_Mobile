import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  useFavoritesStore,
  useIsProviderFavorite,
} from "@/features/pet-owner/shared/stores/favorites.store";
import { useRouter } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProviderDetail } from "../../shared/hooks/useProviderDetail";
import { ProviderAboutSection } from "../components/ProviderAboutSection";
import { ProviderReviewsSection } from "../components/ProviderReviewsSection";

interface ProviderInfoViewProps {
  providerId: string;
}

export function ProviderInfoView({ providerId }: ProviderInfoViewProps) {
  const router = useRouter();
  const { provider, isLoading, isError, isNotFound, refetch } =
    useProviderDetail(providerId);
  const toggleProvider = useFavoritesStore((state) => state.toggleProvider);
  const isFavorite = useIsProviderFavorite(providerId);

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (isError || !provider) {
    return (
      <View className="items-center justify-center flex-1 gap-4 px-5 bg-background">
        <Text className="text-lg text-center text-muted-foreground font-mbold">
          {isNotFound
            ? "Không tìm thấy thông tin cơ sở"
            : "Không thể tải thông tin cơ sở. Vui lòng thử lại."}
        </Text>
        <Pressable
          onPress={() => (isNotFound ? router.back() : refetch())}
          className="px-6 py-3 rounded-full bg-primary active:opacity-90"
        >
          <Text className="text-white font-mbold">
            {isNotFound ? "Quay lại" : "Thử lại"}
          </Text>
        </Pressable>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    toggleProvider({
      id: provider.id,
      name: provider.businessName,
      category: provider.services.categories[0] ?? "Dịch vụ thú cưng",
      imageUrl: provider.avatarUrl,
      rating: provider.rating.average,
      distanceKm: provider.location.distanceKm,
    });
    toast.success(
      isFavorite ? "Đã bỏ khỏi mục yêu thích" : "Đã thêm vào mục yêu thích",
      { position: "bottom", duration: 600 },
    );
  };

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

          <Pressable
            onPress={handleToggleFavorite}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"
            }
            className="flex items-center justify-center w-10 h-10 border rounded-full bg-card border-border/50 active:bg-muted"
          >
            <Heart
              size={20}
              color="#ef4444"
              fill={isFavorite ? "#ef4444" : "transparent"}
            />
          </Pressable>
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
