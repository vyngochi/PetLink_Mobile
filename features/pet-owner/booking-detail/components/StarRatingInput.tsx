import { Star } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

const STAR_COLOR = "#df852a";
const STAR_VALUES = [1, 2, 3, 4, 5];

type StarRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export function StarRatingInput({
  value,
  onChange,
  disabled = false,
}: StarRatingInputProps) {
  return (
    <View className="flex-row items-center justify-center gap-3">
      {STAR_VALUES.map((star) => {
        const filled = star <= value;
        return (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`${star} sao`}
            className="p-1 active:opacity-70"
          >
            <Star
              size={36}
              color={filled ? STAR_COLOR : "#d1d5db"}
              fill={filled ? STAR_COLOR : "transparent"}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
