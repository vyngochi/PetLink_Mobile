import type { Favorites } from "@/features/pet-owner/favorites/types";

export const FAVORITES_MOCK: Favorites = {
  providers: [
    {
      id: "66f1a2b3c4d5e6f789012345",
      name: "Happy Pet Spa",
      category: "Spa & Grooming",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBUbxKMNBmdj89mzldXcQLqlQ13RP6mFxZ-APKGyMui_4yWkow05d_-cC_8WhwmPSnDAmaJglrMvWTKpobWJLBOCThjLgzZu-glpUPS6cZtQcKG7zN6jOfDuY4F4QQV0ITsreCz4D1jcGJXZDCIqPDlm5zqqK24L-Ke47kHQfd5dlhAwtKLB_lidxdVU4so6ssofGcmQX8QMyeDi0kixsnI5G0CDB9a4CY-25BcHdL0wAf-hq-3MIFLTIrGmrfy4TQmqXh7HYzv0wXx",
      rating: 4.8,
      distanceKm: 2.4,
    },
    {
      id: "fav-provider-healthy-paws",
      name: "Healthy Paws Clinic",
      category: "Thú y",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2gO5DonaU5WdxIQmm9Ti3A9-MU-vLagcff92CXq0kOcuKms71N-r6eOoelyPaktemVL2-0BV3wahUOZFk5XN4EaxCXooONlgQLdm0CE-a3R27kAzw9w7JrxVxS3JK428cCjVElYjDVgN0alVg8cl1KxQVDsauOk61j3E-L0G4imoyj6hQ185LRXb-MkipbK4fhhPxNBh_7icQgGIs2M5oLAFvylelOnhN9H3i95ovQjX5S7T5SaB7ia3OL7YFc3E0bJtmEa5GNc6k",
      rating: 4.9,
      distanceKm: 0.8,
    },
    {
      id: "fav-provider-puff-fluff",
      name: "Puff & Fluff Grooming",
      category: "Grooming",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCjRtZfbl0kkCgPL3gpy9mAsTI34DQRqzyq22s30ShY9SnXL1eC6xoyZoCThJzr8jRnJBIL3phjQSZ7qqIRP9egMWs6Rwk1RxSZYw7Wq71tS1eXQsOq5W-SbOH2dSWxtIRzZ63we9jjCe43XQZhUs6JBM2Qs8EXhu4T5PK_I6iIAfqdSTiGqi_SBBxNL-v3O-FxDk8RF9U_8oha0VSVLIViBWxia1HOlHElpjXcttW-5dUcMwtSWWPhK88PG2LhrpRteB1q7ZDfNLQ6",
      rating: 4.8,
      distanceKm: 1.2,
    },
  ],
  services: [
    {
      id: "66f1a2b3c4d5e6f789000002",
      name: "Grooming combo",
      providerName: "Happy Pet Spa",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBUbxKMNBmdj89mzldXcQLqlQ13RP6mFxZ-APKGyMui_4yWkow05d_-cC_8WhwmPSnDAmaJglrMvWTKpobWJLBOCThjLgzZu-glpUPS6cZtQcKG7zN6jOfDuY4F4QQV0ITsreCz4D1jcGJXZDCIqPDlm5zqqK24L-Ke47kHQfd5dlhAwtKLB_lidxdVU4so6ssofGcmQX8QMyeDi0kixsnI5G0CDB9a4CY-25BcHdL0wAf-hq-3MIFLTIrGmrfy4TQmqXh7HYzv0wXx",
      price: 250000,
      durationMinutes: 90,
    },
    {
      id: "66f1a2b3c4d5e6f789000001",
      name: "Tắm thú cưng cơ bản",
      providerName: "Happy Pet Spa",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCd31QW5DcIHl1gRrwGk5YyMTw2N0HgAyknpHgY10AOZVV7PIU5cIay4n3fJKFZmsEFw2EvbAkQhpNf1HytA5Nzyv0ufxuXBO71YkzYlbChyJYsjoge6OEZc8qqPF6twEMOCWM2t-DMfHilOZ0KoiaRejTMuj9z5E2wp40pGh91OMYKWkzcU9bcNcvcmrygQ4aHvojTy12qR84_1r9EXHls_0TDRcC9rfrObk-a4y4ZzYP8w5S_64-qxlLGGHac8-YKOJH0-yhF18qx",
      price: 80000,
      durationMinutes: 45,
    },
    {
      id: "66f1a2b3c4d5e6f789000004",
      name: "Vệ sinh tai, răng miệng",
      providerName: "Happy Pet Spa",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIrhtd0Pl1uCHOhHk_sqbpTFwMObL0Og730qEW7FGT5LpvDcnLgFACFHSadzhH-JgMmhxi_IvHuTs9ZIlJFCdY-Zh7l-zxwBrSXin07dYAvy_TiGVPKae0I5XiWic5dQr4l8G5WnP5ZdfBu4IqEPyLI-2FiIDILGoIXlMppAOrO4BDyy-HHmEcMd20Kxfmvv2ymnkXgkbGX8tyiFUo6ekc-kT3BxNCGfau-Gizqq_g_BlDmqzHIp39bS7b3q1LQGeahT8Db47fEGNF",
      price: 60000,
      durationMinutes: 20,
    },
  ],
};
