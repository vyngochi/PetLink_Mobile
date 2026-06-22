import { useRouter } from "expo-router";
import {
  CheckCircle,
  ChevronLeft,
  MapPin,
  Star,
  Store,
} from "lucide-react-native";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_PROVIDERS } from "../../../provider-list/constants/provider-mock";
import { ProviderItem } from "../../../provider-list/types/provider.type";
import { ServiceCard } from "../components/ServiceCard";

interface ServicesListViewProps {
  providerId: string;
}

export function ServicesListView({ providerId }: ServicesListViewProps) {
  const router = useRouter();

  const provider: ProviderItem | undefined = MOCK_PROVIDERS.find(
    (p) => p.id === providerId,
  );

  if (!provider) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <Text className="text-lg text-muted-foreground font-mbold">
          Không tìm thấy cơ sở
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

  const renderHeader = () => (
    <View className="pb-6 bg-background">
      {/* Cover Image & Back Button */}
      <View className="relative w-full h-56 bg-muted">
        <Image
          source={{ uri: provider.coverImageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/20" />

        {/* Floating Back Button */}
        <SafeAreaView edges={["top"]} className="absolute z-10 top-4 left-4">
          <Pressable
            onPress={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md active:bg-white"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>
        </SafeAreaView>

        {/* Floating Profile Button */}
        <SafeAreaView edges={["top"]} className="absolute z-10 top-4 right-4">
          <Pressable
            onPress={() => {
              // Placeholder for future phase: navigate to provider profile
              console.log("Navigate to Profile", provider.id);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md active:bg-white"
          >
            <Store size={20} className="text-foreground" />
          </Pressable>
        </SafeAreaView>

        {/* Overlapping Avatar */}
        <View className="absolute flex items-center justify-center w-20 h-20 p-1 border-4 rounded-full shadow-sm -bottom-10 left-5 bg-card border-card">
          <Image
            source={{ uri: provider.avatarUrl }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Provider Basic Info */}
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

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={provider.services.preview}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ServiceCard service={item} />}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{ paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
}
