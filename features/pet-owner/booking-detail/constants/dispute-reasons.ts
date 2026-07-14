export const OTHER_DISPUTE_REASON = "other";

export const DISPUTE_REASON_OPTIONS = [
  { value: "not-as-described", label: "Dịch vụ không đúng như mô tả" },
  { value: "poor-quality", label: "Chất lượng dịch vụ kém" },
  { value: "pet-harmed", label: "Thú cưng bị thương hoặc gặp vấn đề sau dịch vụ" },
  { value: "staff-attitude", label: "Thái độ phục vụ không tốt" },
  { value: "wrong-charge", label: "Bị tính phí sai" },
  { value: "not-performed", label: "Cơ sở không thực hiện dịch vụ" },
  { value: OTHER_DISPUTE_REASON, label: "Lý do khác" },
] as const;

export const getDisputeReasonLabel = (value: string) =>
  DISPUTE_REASON_OPTIONS.find((option) => option.value === value)?.label ?? "";
