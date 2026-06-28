import React from "react";
import { Pressable, Text, View } from "react-native";
import { Stethoscope, TriangleAlert } from "lucide-react-native";

import { Colors } from "@/constants/theme";
import type { MedicalRecord } from "@/features/pet-owner/pet-detail/types";

type MedicalHistorySectionProps = {
  criticalNote?: string;
  records: MedicalRecord[];
  onViewAll?: () => void;
};

export function MedicalHistorySection({
  criticalNote,
  records,
  onViewAll,
}: MedicalHistorySectionProps) {
  return (
    <View>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-mbold text-[18px] leading-6 text-foreground">
          Lịch sử y tế
        </Text>
        <Pressable
          onPress={onViewAll}
          accessibilityRole="button"
          accessibilityLabel="Xem tất cả lịch sử y tế"
          hitSlop={8}
        >
          <Text className="font-mbold text-[14px] leading-5 text-primary">
            Xem tất cả
          </Text>
        </Pressable>
      </View>

      {criticalNote ? (
        <View className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <View className="flex-row items-center gap-3">
            <TriangleAlert size={20} color="#ef4444" fill="#fee2e2" />
            <Text className="font-mbold text-[14px] leading-5 text-destructive">
              Lưu ý quan trọng
            </Text>
          </View>
          <Text className="mt-2 font-default text-[16px] leading-6 text-foreground">
            {criticalNote}
          </Text>
        </View>
      ) : null}

      {records.map((record) => (
        <View
          key={record.id}
          className="mt-4 flex-row items-center justify-between rounded-2xl bg-muted p-4"
        >
          <View className="flex-1 flex-row items-center gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-secondary/15">
              <Stethoscope size={20} color={Colors.light.tint} />
            </View>
            <View className="flex-1">
              <Text className="font-mbold text-[14px] leading-5 text-foreground">
                {record.title}
              </Text>
              <Text className="font-default text-[12px] leading-4 text-muted-foreground">
                {record.description}
              </Text>
            </View>
          </View>
          <Text className="font-mbold text-[12px] leading-4 text-muted-foreground">
            {record.date}
          </Text>
        </View>
      ))}
    </View>
  );
}
