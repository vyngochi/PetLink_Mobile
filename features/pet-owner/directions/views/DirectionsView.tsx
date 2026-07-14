import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { useProviderDetail } from "@/features/pet-owner/provider-detail/shared/hooks/useProviderDetail";
import {
  LeafletMap,
  LocationPermissionBanner,
  MapLocateButton,
  type LeafletMapHandle,
  type MapMarker,
} from "@/features/pet-owner/shared/components";
import { useRoute } from "@/features/pet-owner/shared/hooks/useRoute";
import { useUserLocation } from "@/features/pet-owner/shared/hooks/useUserLocation";
import type { LatLng } from "@/features/pet-owner/shared/services/routing.service";
import {
  haversineKm,
  isValidCoords,
} from "@/features/pet-owner/shared/utils/coordinates";
import { RouteSummaryCard } from "../components/RouteSummaryCard";

interface DirectionsViewProps {
  providerId: string;
}

export function DirectionsView({ providerId }: DirectionsViewProps) {
  const router = useRouter();
  const mapRef = useRef<LeafletMapHandle>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const { provider, isLoading, isError } = useProviderDetail(providerId);
  const { coords, permission, isLocating, request } = useUserLocation({
    watch: true,
  });

  const destination = provider?.location.coordinates;
  const hasDestination = isValidCoords(destination);

  const {
    route,
    isLoading: isRouteLoading,
    isError: isRouteError,
    refetch: refetchRoute,
  } = useRoute(coords, hasDestination ? destination : undefined);

  const markers = useMemo<MapMarker[]>(() => {
    if (!isValidCoords(destination) || !provider) return [];

    return [
      {
        id: provider.id,
        title: provider.businessName,
        ...destination,
      },
    ];
  }, [destination, provider]);

  const hasEndpoints = hasDestination && isValidCoords(coords);
  const isRouteMissing = !isRouteLoading && (isRouteError || !route);

  const fallbackRoute = useMemo<LatLng[] | undefined>(() => {
    if (!hasEndpoints || !isRouteMissing) return undefined;

    return [coords as LatLng, destination as LatLng];
  }, [hasEndpoints, isRouteMissing, coords, destination]);

  const straightLineKm =
    hasEndpoints && isRouteMissing
      ? Math.round(haversineKm(coords as LatLng, destination as LatLng) * 10) /
        10
      : undefined;

  const handleRecenter = () => {
    if (permission === "denied") {
      request();
      return;
    }

    setIsFollowing(true);
    mapRef.current?.recenter();
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <View className="items-center justify-center flex-1 bg-background">
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      );
    }

    if (isError || !provider) {
      return (
        <View className="items-center justify-center flex-1 px-5 bg-background">
          <Text className="text-center text-muted-foreground font-default">
            Không thể tải thông tin cơ sở. Vui lòng thử lại.
          </Text>
        </View>
      );
    }

    if (!hasDestination) {
      return (
        <View className="items-center justify-center flex-1 gap-2 px-8 bg-background">
          <Text className="text-lg text-center font-mbold text-foreground">
            Cơ sở chưa cập nhật vị trí bản đồ
          </Text>
          <Text className="text-sm text-center text-muted-foreground font-default">
            {provider.location.address}, {provider.location.ward},{" "}
            {provider.location.district}, {provider.location.province}
          </Text>
        </View>
      );
    }

    const fullAddress = [
      provider.location.address,
      provider.location.ward,
      provider.location.district,
      provider.location.province,
    ]
      .filter(Boolean)
      .join(", ");

    return (
      <View className="flex-1">
        <LeafletMap
          ref={mapRef}
          markers={markers}
          user={coords}
          route={route?.coordinates ?? fallbackRoute}
          isRouteFallback={!route && Boolean(fallbackRoute)}
          follow={isFollowing}
          onUserPan={() => setIsFollowing(false)}
          className="flex-1"
        />

        <View className="absolute right-4 top-4">
          <MapLocateButton onPress={handleRecenter} isLocating={isLocating} />
        </View>

        <View className="absolute bottom-0 left-0 right-0 gap-3 p-4">
          {permission === "denied" ? (
            <LocationPermissionBanner
              onEnable={request}
              message="Cho phép định vị để tính lộ trình từ chỗ bạn"
            />
          ) : null}

          <RouteSummaryCard
            businessName={provider.businessName}
            address={fullAddress}
            route={route}
            straightLineKm={straightLineKm}
            isRouteLoading={isRouteLoading}
            isRouteError={isRouteError}
            permission={permission}
            onRetry={() => refetchRoute()}
          />
        </View>
      </View>
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
            accessibilityRole="button"
            accessibilityLabel="Quay lại"
            className="flex items-center justify-center w-10 h-10 border rounded-full bg-card border-border/50 active:bg-muted"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>

          <View className="flex-1">
            <Text
              className="text-base font-mbold text-foreground"
              numberOfLines={1}
            >
              Chỉ đường
            </Text>
            <Text className="text-xs text-muted-foreground font-default">
              {provider?.businessName ?? "Đang tải..."}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {renderBody()}
    </View>
  );
}
