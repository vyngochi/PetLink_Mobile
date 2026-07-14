import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Clock } from 'lucide-react-native';
import { getImageUrl } from '@/lib/helper/cloudinary.helper';
import { ServiceDetailItem } from '../types/service-detail.type';

interface ServiceHeaderProps {
  service: ServiceDetailItem;
}

const { width } = Dimensions.get('window');

export function ServiceHeader({ service }: ServiceHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <View className="bg-background">
      <View style={{ width, height: width * 0.65 }} className="bg-muted">
        <Image
          source={{
            uri: getImageUrl(service.thumbnailUrl, {
              width,
              height: width * 0.65,
            }),
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/10" />
      </View>

      <View className="px-5 pt-6 pb-4">
        <View className="flex-row items-center gap-2 mb-2">
          <View className="px-2 py-1 bg-surface-container-highest rounded-md">
            <Text className="text-xs text-muted-foreground font-mbold">{service.providerName}</Text>
          </View>
        </View>
        
        <Text className="text-2xl font-mbold text-foreground mb-3">{service.name}</Text>
        
        <View className="flex-row items-center gap-1.5 mb-4">
          <Clock size={16} className="text-muted-foreground" />
          <Text className="text-sm font-default text-muted-foreground">
            Thời gian: {service.durationMinutes} phút
          </Text>
        </View>

        <Text className="text-2xl font-mbold text-primary mb-4">
          {formatCurrency(service.price)}
        </Text>

        <Text className="text-sm font-default text-foreground leading-6">
          {service.longDescription}
        </Text>
      </View>
    </View>
  );
}
