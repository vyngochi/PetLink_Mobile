import { getImageUrl } from "@/lib/helper/cloudinary.helper";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { PetCareTipType } from "../types/home.type";

export function TipCard({ tip }: { tip: PetCareTipType }) {
  return (
    <Pressable className="bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm active:opacity-90">
      <View className="h-48 w-full overflow-hidden bg-muted">
        <Image
          source={{
            uri: getImageUrl(tip.imageUrl, {
              width: Dimensions.get("window").width,
              height: 192,
            }),
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="p-6">
        <View className="bg-primary/10 self-start px-3 py-1 rounded-full mb-3">
          <Text className="text-primary text-xs font-mbold">
            {tip.category}
          </Text>
        </View>
        <Text className="font-mbold text-lg text-foreground mb-2">
          {tip.title}
        </Text>
        <Text className="font-default text-sm text-muted-foreground line-clamp-2">
          {tip.excerpt}
        </Text>
        <View className="mt-4 flex-row items-center gap-1">
          <Text className="text-primary font-mbold text-sm">Đọc thêm</Text>
          <ArrowRight className="text-primary" size={18} />
        </View>
      </View>
    </Pressable>
  );
}

export function PetTipsSection({ tips }: { tips: PetCareTipType[] }) {
  return (
    <View className="mt-8 mb-10">
      <Text className="font-mbold text-xl text-foreground mb-4">
        Mẹo chăm sóc thú cưng
      </Text>
      <View className="flex-col gap-4">
        {tips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </View>
    </View>
  );
}
