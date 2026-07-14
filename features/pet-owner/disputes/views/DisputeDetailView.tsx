import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { BookingDetailTopBar } from "@/features/pet-owner/booking-detail/components";
import { DisputeEvidenceImages } from "@/features/pet-owner/disputes/components/DisputeEvidenceImages";
import { useDisputeDetail } from "@/features/pet-owner/disputes/hooks/useDisputeDetail";
import type { BookingDisputeStatus } from "@/features/pet-owner/shared/types/booking.type";

type DisputeDetailViewProps = {
  disputeId: string;
};

const STATUS_COLORS = {
  primary: Colors.light.tint,
  success: "#10b981",
  destructive: "#ef4444",
  muted: Colors.light.icon,
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
};

const getStatusConfig = (status: BookingDisputeStatus) => {
  switch (status) {
    case "PENDING":
      return {
        label: "Đang chờ xử lý",
        color: STATUS_COLORS.primary,
        icon: Clock,
        bg: "bg-primary/10",
        text: "text-primary",
      };
    case "RESOLVED_CUSTOMER_WIN":
      return {
        label: "Khách hàng thắng",
        color: STATUS_COLORS.success,
        icon: CheckCircle,
        bg: "bg-success/10",
        text: "text-success",
      };
    case "RESOLVED_PROVIDER_WIN":
      return {
        label: "Cửa hàng thắng",
        color: STATUS_COLORS.destructive,
        icon: XCircle,
        bg: "bg-destructive/10",
        text: "text-destructive",
      };
    case "CANCELLED":
      return {
        label: "Đã hủy",
        color: STATUS_COLORS.muted,
        icon: AlertCircle,
        bg: "bg-muted",
        text: "text-muted-foreground",
      };
    default:
      return {
        label: "Không xác định",
        color: STATUS_COLORS.muted,
        icon: AlertCircle,
        bg: "bg-muted",
        text: "text-muted-foreground",
      };
  }
};

export function DisputeDetailView({ disputeId }: DisputeDetailViewProps) {
  const { data: dispute, isLoading, isError } = useDisputeDetail(disputeId);
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={STATUS_COLORS.primary} />
      </View>
    );
  }

  if (isError || !dispute) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="font-mmedium text-base text-muted-foreground">
          Không thể tải thông tin khiếu nại
        </Text>
      </View>
    );
  }

  const statusConfig = getStatusConfig(dispute.status);
  const StatusIcon = statusConfig.icon;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BookingDetailTopBar title="Chi tiết khiếu nại" />
      <ScrollView
        className="flex-1 bg-muted/20"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4">
          {/* Status Header */}
          <View className="mb-4 items-center rounded-2xl bg-card p-6 shadow-sm">
            <View className={`mb-3 rounded-full p-3 ${statusConfig.bg}`}>
              <StatusIcon size={32} color={statusConfig.color} />
            </View>
            <Text className={`font-mbold text-lg ${statusConfig.text}`}>
              {statusConfig.label}
            </Text>
            <Text className="mt-1 text-center font-default text-sm text-muted-foreground">
              Tạo ngày {formatDate(dispute.createAt)}
            </Text>
          </View>

          {/* Customer Content */}
          <View className="mb-4 rounded-2xl bg-card p-4 shadow-sm">
            <View className="mb-3 border-b border-border pb-3">
              <Text className="font-mbold text-[15px] text-foreground">
                Thông tin khiếu nại của bạn
              </Text>
            </View>
            <View className="gap-3">
              <View>
                <Text className="font-default text-[13px] text-muted-foreground">
                  Lý do
                </Text>
                <Text className="mt-1 font-default text-[15px] text-foreground">
                  {dispute.reason}
                </Text>
              </View>
              {dispute.description ? (
                <View>
                  <Text className="font-de text-[13px] text-muted-foreground">
                    Mô tả chi tiết
                  </Text>
                  <Text className="mt-1 font-default text-[15px] text-foreground">
                    {dispute.description}
                  </Text>
                </View>
              ) : null}
              <View>
                <Text className="font-default text-[13px] text-muted-foreground">
                  Hình ảnh minh chứng
                </Text>
                {dispute.evidence?.length > 0 ? (
                  <DisputeEvidenceImages evidence={dispute.evidence} />
                ) : (
                  <Text className="mt-1 font-default text-[14px] text-muted-foreground italic">
                    Không có hình ảnh đính kèm
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Provider Response */}
          {dispute.providerResponse ? (
            <View className="mb-4 rounded-2xl bg-card p-4 shadow-sm">
              <View className="mb-3 border-b border-border pb-3">
                <Text className="font-mbold text-[15px] text-foreground">
                  Phản hồi từ cửa hàng
                </Text>
              </View>
              <View className="gap-3">
                <View>
                  <Text className="font-default text-[13px] text-muted-foreground">
                    Nội dung phản hồi
                  </Text>
                  <Text className="mt-1 font-default text-[15px] text-foreground">
                    {dispute.providerResponse}
                  </Text>
                </View>
                <View>
                  <Text className="font-default text-[13px] text-muted-foreground">
                    Hình ảnh minh chứng
                  </Text>
                  {dispute.providerEvidence?.length > 0 ? (
                    <DisputeEvidenceImages
                      evidence={dispute.providerEvidence}
                    />
                  ) : (
                    <Text className="mt-1 font-default text-[14px] text-muted-foreground italic">
                      Không có hình ảnh đính kèm
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ) : null}

          {/* Admin Note */}
          {dispute.adminNote ? (
            <View className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
              <View className="mb-3 flex-row items-center gap-2 border-b border-primary/20 pb-3">
                <AlertCircle size={18} color={STATUS_COLORS.primary} />
                <Text className="font-mbold text-[15px] text-primary">
                  Quyết định từ Admin
                </Text>
              </View>
              <View className="gap-3">
                <View>
                  <Text className="font-mmedium text-[13px] text-primary/80">
                    Ghi chú
                  </Text>
                  <Text className="mt-1 font-default text-[15px] text-foreground">
                    {dispute.adminNote}
                  </Text>
                </View>
                {dispute.adminEvidence?.length > 0 ? (
                  <View>
                    <Text className="font-mmedium text-[13px] text-primary/80">
                      Hình ảnh minh chứng
                    </Text>
                    <DisputeEvidenceImages evidence={dispute.adminEvidence} />
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
