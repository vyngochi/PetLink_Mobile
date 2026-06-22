import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProviderAboutSection } from '../components/ProviderAboutSection';
import { ProviderReviewsSection } from '../components/ProviderReviewsSection';
import { MOCK_PROVIDERS } from '../../../provider-list/constants/provider-mock';

interface ProviderInfoViewProps {
  providerId: string;
}

export function ProviderInfoView({ providerId }: ProviderInfoViewProps) {
  const router = useRouter();

  const provider = MOCK_PROVIDERS.find(p => p.id === providerId);

  if (!provider) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-muted-foreground font-mbold">Không tìm thấy thông tin cơ sở</Text>
        <Pressable onPress={() => router.back()} className="mt-4 px-4 py-2 bg-primary rounded-full">
          <Text className="text-white font-mbold">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <SafeAreaView edges={['top']} className="bg-surface-container-lowest border-b border-border/50">
        <View className="flex-row items-center px-4 py-3 gap-3">
          <Pressable 
            onPress={() => router.back()}
            className="w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border/50 active:bg-muted"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>
          
          <View className="flex-1 flex-row items-center gap-3">
            <Image 
              source={{ uri: provider.avatarUrl }} 
              className="w-10 h-10 rounded-full border border-border/50"
              resizeMode="cover"
            />
            <View>
              <Text className="text-base font-mbold text-foreground line-clamp-1">
                {provider.businessName}
              </Text>
              <Text className="text-xs text-muted-foreground font-default">
                Thông tin & Đánh giá
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProviderAboutSection provider={provider} />
        
        {/* Divider */}
        <View className="h-2 bg-muted/30 w-full" />
        
        <ProviderReviewsSection providerId={providerId} />
      </ScrollView>
    </View>
  );
}
