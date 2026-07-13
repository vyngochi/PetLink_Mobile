import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';

interface ServiceBenefitsProps {
  benefits: string[];
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <View className="px-5 py-4 bg-background">
      <Text className="text-lg font-mbold text-foreground mb-4">Lợi ích nổi bật</Text>
      <View className="gap-3">
        {benefits.map((benefit, index) => (
          <View key={index} className="flex-row items-start gap-3">
            <CheckCircle2 size={20} className="text-green-500 mt-0.5" />
            <Text className="flex-1 text-sm font-default text-foreground leading-6">
              {benefit}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
