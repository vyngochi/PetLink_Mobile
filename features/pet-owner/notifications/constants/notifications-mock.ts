import type { AppNotification } from "@/features/pet-owner/notifications/types";

export const NOTIFICATIONS_MOCK: AppNotification[] = [
  {
    id: "notif-appointment-bella",
    type: "appointment",
    title: "Nhắc lịch hẹn",
    message: "Đừng quên lịch khám của Bella vào 10:00 sáng mai.",
    time: "2 giờ trước",
    section: "Hôm nay",
    read: false,
    category: "Nhắc nhở",
    detailMessage:
      "Đừng quên đưa Bella đi khám vào lúc 10:00 sáng mai tại Phòng khám Healthy Paws. Vui lòng đến sớm 10 phút.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida/AP1WRLt_wn4NYqVMPR2nozwWxACGx7MZ8aCzaIBgxyXS8qrdqFzjPbvVfxkWBuVFi1DtpuCWz3mVGX8l4y6RaXoSVZ7ReOjV89_cVZVFhTteBxSjb65LBEGDhR5FXbV8rXtxLjTQQOwUq-ahmPpWpGmE9Hsyakoedi-_jWu-anDw27Xs5xuQ9cRnZmZGxuYpLzdktKuHLH87J-BO_FG9r-V-1kIquov-fbEesweBKAfmM08yuiu8g3gNA71G5DU",
    booking: {
      petName: "Bella",
      service: "Khám tổng quát",
      scheduledFor: "Ngày mai, 10:00",
      clinicName: "Healthy Paws Clinic",
      clinicAddress: "123 Pet Lane, Animal City, AC 45678",
    },
  },
  {
    id: "notif-booking-luna",
    type: "booking",
    title: "Đã xác nhận đặt lịch",
    message: "Buổi chăm sóc lông cho Luna đã được xác nhận.",
    time: "Thứ Ba, 16:30",
    section: "Đầu tuần này",
    read: true,
    category: "Đặt lịch",
    detailMessage:
      "Buổi chăm sóc lông cho Luna đã được xác nhận. Chúng tôi sẽ nhắc bạn trước giờ hẹn.",
  },
  {
    id: "notif-vaccination-bella",
    type: "vaccination",
    title: "Đến hạn tiêm phòng",
    message: "Bella sắp đến hạn tiêm vắc-xin dại vào tuần sau.",
    time: "Thứ Hai, 09:15",
    section: "Đầu tuần này",
    read: true,
    category: "Sức khỏe",
    detailMessage:
      "Bella sắp đến hạn tiêm vắc-xin phòng dại vào tuần sau. Hãy đặt lịch để đảm bảo bé luôn khỏe mạnh.",
  },
  {
    id: "notif-promo-treat",
    type: "promo",
    title: "Mở khóa ưu đãi mới!",
    message: "Nhận giảm 10% cho đơn thức ăn cao cấp tiếp theo.",
    time: "Chủ Nhật, 10:00",
    section: "Đầu tuần này",
    read: true,
    category: "Ưu đãi",
    detailMessage:
      "Nhận ngay ưu đãi giảm 10% cho đơn thức ăn cao cấp tiếp theo dành cho thú cưng của bạn.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzfbx_GhdIvd3iew1p2DgF6LtR0-x0cMQicMtrjLNDau5tpGwxl5Ka-vgnGTquSzJDNFP88sp-KijobxFWvmv6CijF6s12bR00IuVnnOKgSU4GgRH-3uUIDXGS5NdQqTWG5lF-C9nZFPClYVZlIejSbpinD4PV7nAGXvPc0WLbjhXbv6XWIE-rsVcOAmc8jyVXRRI93wX8BP6OFEM3sSqwETpFF_AqfnyYeD5hzCvCh42IYzbH4JysPQzS4GWbxFzkAxnhQiGt9IsB",
  },
];

export const hasUnreadNotifications = NOTIFICATIONS_MOCK.some(
  (item) => !item.read
);
