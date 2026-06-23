import React from 'react';
import { View, Text } from 'react-native';
import { Bone } from 'lucide-react-native';

interface ServiceTargetPetsProps {
  targetPets: string[];
}

export function ServiceTargetPets({ targetPets }: ServiceTargetPetsProps) {
  if (!targetPets || targetPets.length === 0) return null;

  return (
    <View className="px-5 py-4 bg-background">
      <Text className="text-lg font-mbold text-foreground mb-3">Đối tượng thú cưng</Text>
      <View className="flex-row flex-wrap gap-2">
        {targetPets.map((pet, index) => (
          <View 
            key={index} 
            className="flex-row items-center gap-1.5 px-3 py-2 bg-surface-container-highest rounded-full border border-border/50"
          >
            <Bone size={14} className="text-primary" />
            <Text className="text-sm font-mbold text-foreground">{pet}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
