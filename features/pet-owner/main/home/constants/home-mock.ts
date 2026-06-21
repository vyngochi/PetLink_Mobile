import { ClinicType, PetCareTipType, QuickServiceType } from '../../../types/home.type';

export const QUICK_SERVICES: QuickServiceType[] = [
  {
    id: 'vet',
    name: 'Vet',
    iconName: 'Stethoscope',
    bgColorClass: 'bg-primary/10',
    textColorClass: 'text-primary',
  },
  {
    id: 'grooming',
    name: 'Grooming',
    iconName: 'Scissors',
    bgColorClass: 'bg-secondary/10',
    textColorClass: 'text-secondary',
  },
  {
    id: 'spa',
    name: 'Spa',
    iconName: 'Droplet',
    bgColorClass: 'bg-[#df852a]/10',
    textColorClass: 'text-[#df852a]',
  },
  {
    id: 'hotel',
    name: 'Hotel',
    iconName: 'Building2',
    bgColorClass: 'bg-primary/10',
    textColorClass: 'text-primary',
  },
  {
    id: 'shop',
    name: 'Shop',
    iconName: 'ShoppingBag',
    bgColorClass: 'bg-secondary/10',
    textColorClass: 'text-secondary',
  },
];

export const POPULAR_CLINICS: ClinicType[] = [
  {
    id: 'c1',
    name: 'Green Valley Vet',
    rating: 4.9,
    distance: '1.2 miles',
    priceStart: 45,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAh6DbhDrdLbhVcsS_rMA2dUPBRfj8gRP4bwrkAp00Qw3SY1Nxp5SF2zU56H3K9p1SZivWhTmWf33_34o-MhTeLJTwoohxNR9GKH93WElysw38TGouu4Oz-Oj7Ur-zu5UaMhblPPxCCCqWT59UKFpzIyAvdoO4Lupbm57kWJe75BlP5FCbjnhWiFEYZGhTCd5yxXp0lUlY6yKv9LlYA-Yt2CXcX1K0l8PPfo_0g8UuNXhWZIv6actUSM-zXeWZNaDhsUftbD_BdgKNp',
  },
  {
    id: 'c2',
    name: 'Paws & Relax Spa',
    rating: 4.8,
    distance: '2.4 miles',
    priceStart: 60,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUbxKMNBmdj89mzldXcQLqlQ13RP6mFxZ-APKGyMui_4yWkow05d_-cC_8WhwmPSnDAmaJglrMvWTKpobWJLBOCThjLgzZu-glpUPS6cZtQcKG7zN6jOfDuY4F4QQV0ITsreCz4D1jcGJXZDCIqPDlm5zqqK24L-Ke47kHQfd5dlhAwtKLB_lidxdVU4so6ssofGcmQX8QMyeDi0kixsnI5G0CDB9a4CY-25BcHdL0wAf-hq-3MIFLTIrGmrfy4TQmqXh7HYzv0wXx',
  },
];

export const PET_CARE_TIPS: PetCareTipType[] = [
  {
    id: 't1',
    title: 'Choosing the right diet for your dog',
    category: 'Nutrition',
    excerpt:
      "Not all pet foods are created equal. Learn how to read labels and understand your pet's specific needs...",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCd31QW5DcIHl1gRrwGk5YyMTw2N0HgAyknpHgY10AOZVV7PIU5cIay4n3fJKFZmsEFw2EvbAkQhpNf1HytA5Nzyv0ufxuXBO71YkzYlbChyJYsjoge6OEZc8qqPF6twEMOCWM2t-DMfHilOZ0KoiaRejTMuj9z5E2wp40pGh91OMYKWkzcU9bcNcvcmrygQ4aHvojTy12qR84_1r9EXHls_0TDRcC9rfrObk-a4y4ZzYP8w5S_64-qxlLGGHac8-YKOJH0-yhF18qx',
  },
];
