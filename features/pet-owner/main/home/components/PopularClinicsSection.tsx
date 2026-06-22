import { Star } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { ClinicType } from '../../../types/home.type';

export function ClinicCard({ clinic }: { clinic: ClinicType }) {
  return (
    <Pressable className="bg-card rounded-3xl p-4 flex-row gap-4 border border-border/50 shadow-sm active:opacity-80">
      <View className="w-24 h-24 rounded-2xl overflow-hidden bg-muted shrink-0">
        <Image
          source={{ uri: clinic.imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-col justify-between py-1 flex-1">
        <View>
          <Text className="font-mbold text-base text-foreground line-clamp-1">
            {clinic.name}
          </Text>
          <View className="flex-row items-center gap-1 mt-1">
            <Star size={16} className="text-[#df852a]" fill="#df852a" />
            <Text className="font-mbold text-sm text-foreground">{clinic.rating}</Text>
            <Text className="font-default text-sm text-muted-foreground ml-1">
              {clinic.distance}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="font-mbold text-primary text-sm">Từ {clinic.priceStart} VND</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function PopularClinicsSection({ clinics }: { clinics: ClinicType[] }) {
  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-mbold text-xl text-foreground">Phòng khám phổ biến</Text>
        <Pressable>
          <Text className="text-primary font-mbold text-sm">Xem tất cả</Text>
        </Pressable>
      </View>
      <View className="flex-col gap-4">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </View>
    </View>
  );
}
