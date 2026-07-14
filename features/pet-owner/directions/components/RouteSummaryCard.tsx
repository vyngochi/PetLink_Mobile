import { Clock, MapPin, Navigation, RotateCw } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/theme";
import type { DrivingRoute } from "@/features/pet-owner/shared/hooks/useRoute";
import type { LocationPermissionState } from "@/features/pet-owner/shared/hooks/useUserLocation";

interface RouteSummaryCardProps {
  businessName: string;
  address: string;
  route?: DrivingRoute;
  straightLineKm?: number;
  isRouteLoading: boolean;
  isRouteError: boolean;
  permission: LocationPermissionState;
  onRetry: () => void;
}

export function RouteSummaryCard({
  businessName,
  address,
  route,
  straightLineKm,
  isRouteLoading,
  isRouteError,
  permission,
  onRetry,
}: RouteSummaryCardProps) {
  const renderStatus = () => {
    if (permission === "denied") {
      return (
        <Text className="text-sm text-muted-foreground font-default">
          Cần quyền truy cập vị trí để tính lộ trình từ chỗ bạn.
        </Text>
      );
    }

    if (permission === "pending" || isRouteLoading) {
      return (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator size="small" color={Colors.light.tint} />
          <Text className="text-sm text-muted-foreground font-default">
            Đang tính lộ trình...
          </Text>
        </View>
      );
    }

    if (isRouteError || !route) {
      return (
        <View className="gap-2">
          {straightLineKm !== undefined ? (
            <View className="flex-row items-center gap-2">
              <Navigation size={16} className="text-muted-foreground" />
              <Text className="text-sm text-muted-foreground font-default">
                Cách bạn khoảng {straightLineKm} km theo đường chim bay
              </Text>
            </View>
          ) : null}

          <Pressable
            onPress={onRetry}
            accessibilityRole="button"
            className="flex-row items-center gap-2 active:opacity-70"
          >
            <RotateCw size={16} className="text-primary" />
            <Text className="text-sm font-mbold text-primary">
              Không tải được lộ trình. Thử lại
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-2">
          <Navigation size={16} className="text-primary" />
          <Text className="text-sm font-mbold text-foreground">
            {route.distanceKm} km
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Clock size={16} className="text-primary" />
          <Text className="text-sm font-mbold text-foreground">
            {route.durationMinutes} phút
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="gap-4 p-5 border shadow-sm rounded-3xl border-border bg-card">
      <View className="flex-row items-start gap-3">
        <View className="items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <MapPin size={18} className="text-primary" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-mbold text-foreground" numberOfLines={1}>
            {businessName}
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground font-default">
            {address}
          </Text>
        </View>
      </View>

      {renderStatus()}
    </View>
  );
}
