import React from 'react';
import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export interface BentoItemProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconBgColorClass?: string;
  iconColorClass?: string;
  isLarge?: boolean;
}

export function BentoItem({
  title,
  description,
  Icon,
  iconBgColorClass = 'bg-primary/20',
  iconColorClass = 'text-primary',
  isLarge = false,
}: BentoItemProps) {
  return (
    <View
      className={`p-4 bg-card rounded-2xl border border-border flex ${
        isLarge ? 'flex-row items-start gap-4' : 'flex-col gap-3'
      }`}
      style={{
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <View
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBgColorClass}`}
      >
        <Icon className={iconColorClass} size={24} />
      </View>
      <View className="flex-1">
        <Text className={`font-mbold text-foreground ${isLarge ? 'text-lg' : 'text-sm'}`}>
          {title}
        </Text>
        <Text
          className={`font-default text-muted-foreground mt-1 ${
            isLarge ? 'text-sm' : 'text-xs leading-4'
          }`}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
