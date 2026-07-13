import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Image } from "expo-image";
import { Heart } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type FavoriteCardProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  meta: React.ReactNode;
  onPress?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
};

export function FavoriteCard({
  imageUrl,
  title,
  subtitle,
  meta,
  onPress,
  onRemove,
  removeLabel = "Bỏ yêu thích",
}: FavoriteCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}
      className="flex-row gap-4 rounded-[20px] border border-border bg-card p-4 shadow-sm"
    >
      <Image
        source={{ uri: getImageUrl(imageUrl, { width: 88, height: 88 }) }}
        accessibilityLabel={title}
        contentFit="cover"
        transition={200}
        style={{ width: 88, height: 88, borderRadius: 16 }}
      />

      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row items-start justify-between gap-2">
            <Text
              className="flex-1 font-mbold text-[16px] leading-5 text-foreground"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Pressable
              onPress={onRemove}
              accessibilityRole="button"
              accessibilityLabel={removeLabel}
              hitSlop={10}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <Heart size={22} color="#ef4444" fill="#ef4444" />
            </Pressable>
          </View>
          <Text
            className="mt-0.5 font-default text-[13px] leading-5 text-muted-foreground"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        </View>

        <View className="mt-2">{meta}</View>
      </View>
    </Pressable>
  );
}
