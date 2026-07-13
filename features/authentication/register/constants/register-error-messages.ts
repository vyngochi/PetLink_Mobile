import type { ApiErrorMessageOptions } from "@/lib/http";

export const REGISTER_ERROR_MESSAGES: ApiErrorMessageOptions = {
  fallback: "Đăng ký thất bại. Vui lòng thử lại.",
  network: "Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối mạng.",
  byStatus: {
    409: "Tên đăng nhập, email hoặc số điện thoại đã được sử dụng.",
  },
};
