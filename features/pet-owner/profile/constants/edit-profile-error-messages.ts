import type { ApiErrorMessageOptions } from "@/lib/http";

export const EDIT_PROFILE_ERROR_MESSAGES: ApiErrorMessageOptions = {
  fallback: "Cập nhật hồ sơ thất bại. Vui lòng thử lại.",
  network: "Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối mạng.",
  byStatus: {
    401: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
    403: "Bạn không có quyền thực hiện thao tác này.",
  },
};
