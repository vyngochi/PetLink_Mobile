import { Navigation } from "lucide-react-native";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import type { LatLng } from "../services/routing.service";
import { LeafletMap, type MapMarker } from "./LeafletMap";

interface MapPreviewProps {
  destination: LatLng;
  onPress: () => void;
  label?: string;
  title?: string;
}

export function MapPreview({
  destination,
  onPress,
  label = "Xem chỉ đường",
  title = "Cơ sở",
}: MapPreviewProps) {
  const markers = useMemo<MapMarker[]>(
    () => [{ id: "destination", title, ...destination }],
    [destination, title],
  );

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="overflow-hidden border rounded-2xl border-border/50 bg-muted active:opacity-90"
    >
      <LeafletMap markers={markers} interactive={false} className="w-full h-40" />

      <View className="flex-row items-center justify-between px-4 py-3 bg-card">
        <Text className="text-sm font-mbold text-primary">{label}</Text>
        <Navigation size={16} className="text-primary" />
      </View>
    </Pressable>
  );
}
