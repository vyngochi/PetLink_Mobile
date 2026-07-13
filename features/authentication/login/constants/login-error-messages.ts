import type { ApiErrorMessageOptions } from "@/lib/http";

export const LOGIN_ERROR_MESSAGES: ApiErrorMessageOptions = {
  fallback: "Đăng nhập thất bại. Vui lòng thử lại.",
  network: "Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối mạng.",
  byStatus: {
    400: "Tên đăng nhập hoặc mật khẩu không đúng.",
    401: "Tên đăng nhập hoặc mật khẩu không đúng.",
    403: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ.",
    429: "Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau.",
  },
};
