import { ProviderReview } from "../types/review.type";

export const MOCK_REVIEWS: ProviderReview[] = [
  {
    id: "r1",
    providerId: "66f1a2b3c4d5e6f789012345",
    userId: "u1",
    userName: "Nguyễn Văn A",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    comment:
      "Dịch vụ rất tốt, nhân viên nhiệt tình, chó nhà mình tắm xong rất thơm và sạch sẽ. Sẽ quay lại ủng hộ!",
    serviceName: "Tắm thú cưng cơ bản",
    createdAt: "2026-06-15T08:30:00.000Z",
  },
  {
    id: "r2",
    providerId: "66f1a2b3c4d5e6f789012345",
    userId: "u2",
    userName: "Trần Thị B",
    rating: 4,
    comment:
      "Không gian sạch sẽ, cắt tỉa gọn gàng. Hơi đông nên phải đợi một chút dù đã đặt lịch trước.",
    serviceName: "Grooming combo",
    createdAt: "2026-06-18T14:15:00.000Z",
  },
  {
    id: "r3",
    providerId: "66f1a2b3c4d5e6f789012345",
    userId: "u3",
    userName: "Lê Hoàng C",
    userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    comment:
      "Tuyệt vời! Bé mèo nhà mình rất nhát nhưng các bạn nhân viên dỗ dành rất khéo. Làm vệ sinh tai và răng miệng cực kỳ sạch.",
    serviceName: "Vệ sinh tai, răng miệng",
    createdAt: "2026-06-20T10:00:00.000Z",
  },
  {
    id: "r4",
    providerId: "66f1a2b3c4d5e6f789012345",
    userId: "u4",
    userName: "Phạm D",
    rating: 3,
    comment:
      "Giá hơi cao so với mặt bằng chung, chất lượng cắt móng ổn nhưng mình hy vọng có thêm dịch vụ mài móng.",
    serviceName: "Cắt tỉa móng",
    createdAt: "2026-06-21T09:45:00.000Z",
  },
];
