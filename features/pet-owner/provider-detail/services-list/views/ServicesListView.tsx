import { Colors } from "@/constants/theme";
import { toast } from "@/components/toast";
import { useFavoritesStore, useIsProviderFavorite } from "@/features/pet-owner/shared/stores/favorites.store";
import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Href, useRouter } from "expo-router";
import {
  CheckCircle,
  ChevronLeft,
  Heart,
  MapPin,
  Star,
  Store,
} from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProviderDetail } from "../../shared/hooks/useProviderDetail";
import { ServiceCard } from "../components/ServiceCard";
import { useProviderServices } from "../hooks/useProviderServices";

const { width } = Dimensions.get("window");
const COVER_HEIGHT = 224;
const AVATAR_SIZE = 80;

interface ServicesListViewProps {
  providerId: string;
}

export function ServicesListView({ providerId }: ServicesListViewProps) {
  const router = useRouter();
  const {
    provider,
    isLoading: isProviderLoading,
    isError: isProviderError,
    isNotFound,
    refetch: refetchProvider,
  } = useProviderDetail(providerId);
  const {
    services,
    isLoading: isServicesLoading,
    isError: isServicesError,
    refetch: refetchServices,
  } = useProviderServices(providerId);
  const toggleProvider = useFavoritesStore((state) => state.toggleProvider);
  const isFavorite = useIsProviderFavorite(providerId);

  if (isProviderLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (isProviderError || !provider) {
    return (
      <View className="items-center justify-center flex-1 gap-4 px-5 bg-background">
        <Text className="text-lg text-center text-muted-foreground font-mbold">
          {isNotFound
            ? "Không tìm thấy cơ sở"
            : "Không thể tải thông tin cơ sở. Vui lòng thử lại."}
        </Text>
        <Pressable
          onPress={() => (isNotFound ? router.back() : refetchProvider())}
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

  const renderHeader = () => (
    <View className="pb-6 bg-background">
      <View className="relative w-full h-56 bg-muted">
        <Image
          source={{
            uri: getImageUrl(provider.coverImageUrl, {
              width,
              height: COVER_HEIGHT,
            }),
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/20" />

        <SafeAreaView edges={["top"]} className="absolute z-10 top-4 left-4">
          <Pressable
            onPress={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md active:bg-white"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>
        </SafeAreaView>

        <SafeAreaView edges={["top"]} className="absolute z-10 top-4 right-4">
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={handleToggleFavorite}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md active:bg-white"
            >
              <Heart
                size={20}
                color="#ef4444"
                fill={isFavorite ? "#ef4444" : "transparent"}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                router.push(`/pet-owner/provider/${provider.id}/info` as Href);
              }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md active:bg-white"
            >
              <Store size={20} className="text-foreground" />
            </Pressable>
          </View>
        </SafeAreaView>

        <View className="absolute flex items-center justify-center w-20 h-20 p-1 border-4 rounded-full shadow-sm -bottom-10 left-5 bg-card border-card">
          <Image
            source={{
              uri: getImageUrl(provider.avatarUrl, {
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
              }),
            }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        </View>
      </View>

      <View className="px-5 pt-12 pb-2">
        <View className="flex-row items-center gap-1 mb-1">
          <Text className="text-2xl font-mbold text-foreground">
            {provider.businessName}
          </Text>
          {provider.isVerified && (
            <CheckCircle
              size={20}
              className="text-primary"
              fill="currentColor"
              color="white"
            />
          )}
        </View>

        <Text className="mb-3 text-sm text-muted-foreground font-default line-clamp-2">
          {provider.description}
        </Text>

        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Star size={16} className="text-[#df852a]" fill="#df852a" />
            <Text className="text-sm font-mbold text-foreground">
              {provider.rating.average}
            </Text>
            <Text className="text-sm text-muted-foreground font-default">
              ({provider.rating.totalReviews})
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MapPin size={16} className="text-muted-foreground" />
            <Text className="text-sm font-default text-muted-foreground">
              Cách bạn {provider.location.distanceKm}km
            </Text>
          </View>
        </View>
      </View>

      <View className="px-5 mt-6 mb-2">
        <Text className="text-xl font-mbold text-foreground">Dịch vụ</Text>
      </View>
    </View>
  );

  const renderEmpty = () => {
    if (isServicesLoading) {
      return (
        <View className="items-center justify-center py-16">
          <ActivityIndicator color={Colors.light.tint} />
        </View>
      );
    }

    if (isServicesError) {
      return (
        <View className="items-center justify-center gap-3 px-5 py-16">
          <Text className="text-sm text-center text-muted-foreground font-default">
            Không thể tải danh sách dịch vụ.
          </Text>
          <Pressable
            onPress={() => refetchServices()}
            className="px-6 py-2 rounded-full bg-primary active:opacity-90"
          >
            <Text className="text-white font-mbold">Thử lại</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View className="items-center justify-center py-16">
        <Text className="text-sm text-muted-foreground font-default">
          Cơ sở này chưa có dịch vụ nào.
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ServiceCard service={item} />}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{ paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
}
