export const OTHER_CANCEL_REASON = "other";

export const CANCEL_REASON_OPTIONS = [
  { value: "busy", label: "Tôi có việc bận đột xuất" },
  { value: "reschedule", label: "Tôi muốn đổi sang ngày/giờ khác" },
  { value: "wrong-booking", label: "Tôi đặt nhầm dịch vụ hoặc thú cưng" },
  { value: "pet-health", label: "Thú cưng đang có vấn đề sức khỏe" },
  { value: "found-another", label: "Tôi tìm được cơ sở khác phù hợp hơn" },
  { value: OTHER_CANCEL_REASON, label: "Lý do khác" },
] as const;

export const getCancelReasonLabel = (value: string) =>
  CANCEL_REASON_OPTIONS.find((option) => option.value === value)?.label ?? "";
