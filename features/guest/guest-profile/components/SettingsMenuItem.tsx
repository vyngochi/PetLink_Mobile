import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LucideIcon, ChevronRight } from 'lucide-react-native';

export interface SettingsMenuItemProps {
  title: string;
  subtitle?: string;
  Icon: LucideIcon;
  isLast?: boolean;
  onPress?: () => void;
}

export function SettingsMenuItem({
  title,
  subtitle,
  Icon,
  isLast = false,
  onPress,
}: SettingsMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row items-center justify-between p-4 bg-card active:bg-muted/50 ${
        !isLast ? 'border-b border-border' : ''
      }`}
    >
      <View className="flex-row items-center gap-4">
        <Icon className="text-muted-foreground" size={24} />
        <View className="text-left">
          <Text className="font-default text-base text-foreground">{title}</Text>
          {subtitle && (
            <Text className="text-xs text-muted-foreground mt-0.5">{subtitle}</Text>
          )}
        </View>
      </View>
      <ChevronRight className="text-muted-foreground/50" size={20} />
    </Pressable>
  );
}
