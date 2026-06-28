import type { PetDetail } from "@/features/pet-owner/pet-detail/types";

export const petDetails: PetDetail[] = [
  {
    id: "bella",
    name: "Bella",
    breed: "Golden Retriever",
    gender: "Cái",
    ageLabel: "3 tuổi",
    status: "active",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbe8IOOnwbw-KgV6kiucxSaoML2J4_l19b5pQTS7LlGLU_sXPQAOjOYB4QhXFdjc13_hsF6k-8lqOeWmIse1-pKR00YhU7q2MeibnAQF9PwLkWUOajAjqhaKn4u1pBumzdS_QJUKIS9RMOmLqlhHesQmvCmbTzM9l4SYldbrMMx-TI1ykWvpFuHx9hxlCAw8zPBPbCxmKYNf4MvIAlsUv_AKRoTAmTew-CCCkWYB1PPEtqHR7zoqWAK_2u_mxxGT7ylp3oY1eDf7wv",
    weight: "28kg",
    height: "60cm",
    color: "Vàng",
    criticalNote:
      "Dị ứng với thịt gà. Hãy đảm bảo chế độ ăn chỉ gồm thịt cừu hoặc cá để tránh kích ứng da.",
    healthReminder: {
      title: "Sắp tới: Vắc-xin dại",
      date: "12 Th12, 2024",
    },
    medicalRecords: [
      {
        id: "checkup-aug",
        title: "Khám định kỳ",
        description: "Cân nặng & phát triển khỏe mạnh",
        date: "15 Th8",
      },
    ],
    photos: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaswLRFs43b8IOLASdCWuYs2eIbgw5nObqdgc3GZVhMKgqkGkd8druWLUtEi6Jo7-XP9rDBpwqxXyC_bEkjB-KI7asR6CRZU6_npy8lUPx1k6SDgNFJkykmeDMBTsDsrrVIT5bc5c_-X_l91wZ-2otlcxCdeHOF3ToYQPssMeSUc1KkoX38ANeplRaB8MvHCU9i5JF7YrNpu8MlzmSlJQvCdkvxfefoSsbyd7Iv5hT8_ems6jTnPDU2kwDNN7VJgKiwlJhwFqvOk2Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqs8RhWh0qtQRtq-6DfqUDSAtZ6sHj02cVbBOkld0OePB_VBoaPyw86JGYtCFJKkZ3FD0jSLEWFk-_Qryin6dBtVT1u4S7G0DSUDjN01k524Iwu57jhNbQ7ITGVWEOew8EJTxB61EtHkxE_ApwK-aYPGcTjO9Dzqn7rf-LOYbOz6OCnAsiJAPxCB33YszK3D7NNT8lLaan7eLStn1ipSiT2jcW-U2E1kSeoiURnN25Bg_6Xi5Sss7hMt_3oSC_ubCUkLYjPE1u-imo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnyZAiLsfjkWRxxeXPVfuGU9U6I7Ro7evcedWXeWjcBVmIKtOE9-AJ1R671Jl17tyM7ZM0Gk6_M5Cr9EAR0Oyb5oWExm3JGbMj3uI60QVXOiL7yakKYIzCeF7Q-hnEQRTe1u5woyd2IcVJN0UcQLOgAdKolYDVFDcbTOETvKcQaPACjLMYt84vAHlwj1PY1MR124x0RylveOLXF-qDIKxfbm5flCcF1DIdfzscH0i093SPxT-dOxyphP3VSicZ9Tc9tHp-GCONUMUl",
    ],
  },
  {
    id: "luna",
    name: "Luna",
    breed: "Mèo Xiêm",
    gender: "Cái",
    ageLabel: "2 tuổi",
    status: "active",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9kpYBJk2Ua805d2WQOxXLrinqXV7BFTigb1GyWgHyezLochchY-TKbt1oOEKo4XuYIcZDJRFvJvlFFScCrXZLncseUC5WoTgUes2QH_C6a_m-MeCDOZKzYAFUtRWD0XzqP7vFgZCfJWTiokXwyGKls7tH31q3NqaDjvM_jMetDwT5A-zFhW7FK0YVRuvnQxwALOXgqcreJIl4d0rd0PjBKKBV7AowQoAHLwNAQbMoC6sK9CGx3Ybgz8_5IIkOUWP5GJFQ552rJpLr",
    weight: "4kg",
    height: "25cm",
    color: "Kem",
    healthReminder: {
      title: "Sắp tới: Vắc-xin tổng hợp",
      date: "05 Th1, 2025",
    },
    medicalRecords: [
      {
        id: "checkup-jul",
        title: "Khám định kỳ",
        description: "Sức khỏe tổng quát ổn định",
        date: "20 Th7",
      },
    ],
    photos: [],
  },
];
