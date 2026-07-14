import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { Image } from "expo-image";
import { CheckCircle2, Circle, Heart, Trash2 } from "lucide-react-native";
import React, { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

type FavoriteCardProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  meta: React.ReactNode;
  onPress?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  isEditing?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
};

export function FavoriteCard({
  imageUrl,
  title,
  subtitle,
  meta,
  onPress,
  onRemove,
  removeLabel = "Bỏ yêu thích",
  isEditing = false,
  isSelected = false,
  onSelect,
}: FavoriteCardProps) {
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Pressable
        onPress={() => {
          swipeableRef.current?.close();
          onRemove?.();
        }}
        className="w-[80px] bg-destructive items-center justify-center rounded-[20px] ml-2"
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Trash2 color="white" size={24} />
        </Animated.View>
      </Pressable>
    );
  };

  const handlePress = () => {
    if (isEditing) {
      onSelect?.();
    } else {
      onPress?.();
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={isEditing ? undefined : renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
        className="flex-row items-center gap-4 rounded-[20px] border-2 border-border bg-card p-4"
      >
        {isEditing && (
          <View className="mr-1">
            {isSelected ? (
              <CheckCircle2 size={24} color="#ef4444" fill="#fee2e2" />
            ) : (
              <Circle size={24} color="#a1a1aa" />
            )}
          </View>
        )}

        <Image
          source={{ uri: getImageUrl(imageUrl, { width: 88, height: 88 }) }}
          accessibilityLabel={title}
          contentFit="cover"
          transition={200}
          style={{ width: 88, height: 88, borderRadius: 16 }}
        />

        <View className="flex-1 justify-between h-[88px]">
          <View>
            <View className="flex-row items-start justify-between gap-2">
              <Text
                className="flex-1 font-mbold text-[16px] leading-5 text-foreground"
                numberOfLines={1}
              >
                {title}
              </Text>
              {!isEditing && (
                <Pressable
                  onPress={onRemove}
                  accessibilityRole="button"
                  accessibilityLabel={removeLabel}
                  hitSlop={10}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <Heart size={22} color="#ef4444" fill="#ef4444" />
                </Pressable>
              )}
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
    </Swipeable>
  );
}
