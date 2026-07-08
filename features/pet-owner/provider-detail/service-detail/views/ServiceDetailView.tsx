import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ServiceBenefits } from "../components/ServiceBenefits";
import { ServiceBottomCTA } from "../components/ServiceBottomCTA";
import { ServiceHeader } from "../components/ServiceHeader";
import { ServiceTargetPets } from "../components/ServiceTargetPets";
import { MOCK_SERVICE_DETAILS } from "../constants/service-detail-mock";

interface ServiceDetailViewProps {
  serviceId: string;
}

export function ServiceDetailView({ serviceId }: ServiceDetailViewProps) {
  const router = useRouter();
  // const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const service = MOCK_SERVICE_DETAILS.find((s) => s.id === serviceId);

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
            className="ml-4 text-lg font-mbold text-foreground"
          >
            Chi tiết dịch vụ
          </Animated.Text>
        </SafeAreaView>
      </View>

      <ServiceBottomCTA service={service} onBookPress={handleBookPress} />
    </View>
  );
}
