import { ProviderItem } from "../types/provider.type";

export const MOCK_PROVIDERS: ProviderItem[] = [
  {
    id: "66f1a2b3c4d5e6f789012345",
    slug: "happy-pet-spa",
    businessName: "Happy Pet Spa",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUbxKMNBmdj89mzldXcQLqlQ13RP6mFxZ-APKGyMui_4yWkow05d_-cC_8WhwmPSnDAmaJglrMvWTKpobWJLBOCThjLgzZu-glpUPS6cZtQcKG7zN6jOfDuY4F4QQV0ITsreCz4D1jcGJXZDCIqPDlm5zqqK24L-Ke47kHQfd5dlhAwtKLB_lidxdVU4so6ssofGcmQX8QMyeDi0kixsnI5G0CDB9a4CY-25BcHdL0wAf-hq-3MIFLTIrGmrfy4TQmqXh7HYzv0wXx",
    coverImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAh6DbhDrdLbhVcsS_rMA2dUPBRfj8gRP4bwrkAp00Qw3SY1Nxp5SF2zU56H3K9p1SZivWhTmWf33_34o-MhTeLJTwoohxNR9GKH93WElysw38TGouu4Oz-Oj7Ur-zu5UaMhblPPxCCCqWT59UKFpzIyAvdoO4Lupbm57kWJe75BlP5FCbjnhWiFEYZGhTCd5yxXp0lUlY6yKv9LlYA-Yt2CXcX1K0l8PPfo_0g8UuNXhWZIv6actUSM-zXeWZNaDhsUftbD_BdgKNp",
    description: "Dịch vụ spa và chăm sóc thú cưng chuyên nghiệp.",
    isVerified: true,
    status: "active",
    location: {
      address: "123 Nguyễn Trãi",
      ward: "Phường 1",
      district: "Quận 5",
      province: "Hồ Chí Minh",
      coordinates: {
        lat: 10.762622,
        lng: 106.660172,
      },
      distanceKm: 2.4,
    },
    rating: {
      average: 4.8,
      totalReviews: 126,
    },
    services: {
      total: 6,
      categories: ["Grooming", "Bathing", "Nail Trimming"],
      priceRange: {
        min: 80000,
        max: 350000,
        currency: "VND",
      },
      preview: [
        {
          id: "66f1a2b3c4d5e6f789000001",
          name: "Tắm thú cưng cơ bản",
          price: 80000,
          durationMinutes: 45,
          thumbnailUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCd31QW5DcIHl1gRrwGk5YyMTw2N0HgAyknpHgY10AOZVV7PIU5cIay4n3fJKFZmsEFw2EvbAkQhpNf1HytA5Nzyv0ufxuXBO71YkzYlbChyJYsjoge6OEZc8qqPF6twEMOCWM2t-DMfHilOZ0KoiaRejTMuj9z5E2wp40pGh91OMYKWkzcU9bcNcvcmrygQ4aHvojTy12qR84_1r9EXHls_0TDRcC9rfrObk-a4y4ZzYP8w5S_64-qxlLGGHac8-YKOJH0-yhF18qx",
        },
        {
          id: "66f1a2b3c4d5e6f789000002",
          name: "Grooming combo",
          price: 250000,
          durationMinutes: 90,
          thumbnailUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBUbxKMNBmdj89mzldXcQLqlQ13RP6mFxZ-APKGyMui_4yWkow05d_-cC_8WhwmPSnDAmaJglrMvWTKpobWJLBOCThjLgzZu-glpUPS6cZtQcKG7zN6jOfDuY4F4QQV0ITsreCz4D1jcGJXZDCIqPDlm5zqqK24L-Ke47kHQfd5dlhAwtKLB_lidxdVU4so6ssofGcmQX8QMyeDi0kixsnI5G0CDB9a4CY-25BcHdL0wAf-hq-3MIFLTIrGmrfy4TQmqXh7HYzv0wXx",
        },
      ],
    },
    availability: {
      isOpenNow: true,
      todayOpeningHours: {
        open: "08:00",
        close: "20:00",
      },
    },
    paymentMethods: {
      online: true,
      cash: true,
    },
    createdAt: "2026-06-01T10:30:00.000Z",
  },
];
