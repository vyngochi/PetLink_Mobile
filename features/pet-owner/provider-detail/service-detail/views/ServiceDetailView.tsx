import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  useFavoritesStore,
  useIsServiceFavorite,
} from "@/features/pet-owner/shared/stores/favorites.store";
import { useRouter } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ServiceBenefits } from "../components/ServiceBenefits";
import { ServiceBottomCTA } from "../components/ServiceBottomCTA";
import { ServiceHeader } from "../components/ServiceHeader";
import { ServiceTargetPets } from "../components/ServiceTargetPets";
import { useServiceDetail } from "../hooks/useServiceDetail";

interface ServiceDetailViewProps {
  serviceId: string;
}

export function ServiceDetailView({ serviceId }: ServiceDetailViewProps) {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const { service, isLoading, isError, refetch } = useServiceDetail(serviceId);
  const toggleService = useFavoritesStore((state) => state.toggleService);
  const isFavorite = useIsServiceFavorite(serviceId);

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="items-center justify-center flex-1 gap-4 px-5 bg-background">
        <Text className="text-lg text-center text-muted-foreground font-mbold">
          Không thể tải dịch vụ. Vui lòng thử lại.
        </Text>
        <Pressable
          onPress={() => refetch()}
          className="px-6 py-3 rounded-full bg-primary active:opacity-90"
        >
          <Text className="text-white font-mbold">Thử lại</Text>
        </Pressable>
      </View>
    );
  }

  if (!service) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <Text className="text-lg text-muted-foreground font-mbold">
          Không tìm thấy dịch vụ
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

  const handleBookPress = () => {
    router.push({
      pathname: "/pet-owner/booking/create",
      params: { serviceId: service.id },
    });
  };

  const handleToggleFavorite = () => {
    toggleService({
      id: service.id,
      name: service.name,
      providerName: service.providerName,
      imageUrl: service.thumbnailUrl,
      price: service.price,
      durationMinutes: service.durationMinutes,
    });
    toast.success(
      isFavorite ? "Đã bỏ khỏi mục yêu thích" : "Đã thêm vào mục yêu thích",
      { position: "bottom", duration: 600 },
    );
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [50, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View className="relative flex-1 bg-background">
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <ServiceHeader service={service} />

        <View className="w-full h-2 bg-muted/30" />
        <ServiceTargetPets targetPets={service.targetPets} />

        <View className="w-full h-2 bg-muted/30" />
        <ServiceBenefits benefits={service.benefits} />
      </Animated.ScrollView>

      <View className="absolute top-0 left-0 right-0 z-10">
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            opacity: headerOpacity,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0,0,0,0.05)",
          }}
        />
        <SafeAreaView
          edges={["top"]}
          className="flex-row items-center px-4 pt-1 pb-2"
        >
          <Pressable
            onPress={() => router.back()}
            className="flex items-center justify-center w-10 h-10 gap-1 rounded-full shadow-sm bg-white/80 active:bg-white"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>
          <Animated.Text
            style={{ opacity: headerOpacity }}
            className="flex-1 ml-4 text-lg font-mbold text-foreground"
          >
            Chi tiết dịch vụ
          </Animated.Text>
          <Pressable
            onPress={handleToggleFavorite}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"
            }
            className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm bg-white/80 active:bg-white"
          >
            <Heart
              size={20}
              color="#ef4444"
              fill={isFavorite ? "#ef4444" : "transparent"}
            />
          </Pressable>
        </SafeAreaView>
      </View>

      <ServiceBottomCTA service={service} onBookPress={handleBookPress} />
    </View>
  );
}
