import type { Booking } from "@/features/pet-owner/bookings/types";

export const BOOKINGS_MOCK: Booking[] = [
  {
    id: "booking-bella-checkup",
    petName: "Bella",
    petBreed: "Golden Retriever",
    petImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1gmn0ZIUX7gWnKxtfV-eZ3mTtjwPY-fWVljNAfi6DrkOjX0IOXvwNgh-SdGuE9hsWBth6oQB8NW5IveTDazneqfo1HfDLr8Y_p-RlqlgRoHEiwljwPWPqRb8iXGYlslz9N-BRInNRQQTpDkCM5OY5P9nLMZ5INBFPYG8Q6aTprWE0AptkQEA0heqBoNIAFV3OSJAQf_nKcDW0zfR7x5MOWH-9t5PiI-phb1aZhw0vXQw0y5NnYlErdNkWsd4NEapaHPoCYBvB4TKC",
    status: "confirmed",
    scheduledAtLabel: "Ngày mai, 10:00",
    serviceName: "Khám tổng quát",
    serviceType: "medical",
    providerName: "Healthy Paws Clinic",
  },
  {
    id: "booking-luna-grooming",
    petName: "Luna",
    petBreed: "Mèo Xiêm",
    petImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNKKgPxmd_z6cDzHjCVn53pwRdj3KZ6-cdhX3_78_xrB6dkR7Aup9A7_IjJQYJ1OxAY812gpf4Vyi3uZCqC2NfN5_sgvMbgC3kly9i1AkI-QYPBxGsC8RbvaYvhIgNznZ9vuTzBDbWYRdTymXZ4C8tER1WiRweVOLF_d3Jru-bkbI_AOuiWgcTw5lnxKR2x31aeM-L3oreSjTGmdD4Haap98FbAyPRF76zqX8ujRF-C9236Q9tMK-zzOApDKtGPP7nYqsyWhkjNWLy",
    status: "pending",
    scheduledAtLabel: "24/10, 14:30",
    serviceName: "Grooming combo",
    serviceType: "grooming",
    providerName: "Fluffy Spa",
  },
  {
    id: "booking-bella-vaccine",
    petName: "Bella",
    petBreed: "Golden Retriever",
    petImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1gmn0ZIUX7gWnKxtfV-eZ3mTtjwPY-fWVljNAfi6DrkOjX0IOXvwNgh-SdGuE9hsWBth6oQB8NW5IveTDazneqfo1HfDLr8Y_p-RlqlgRoHEiwljwPWPqRb8iXGYlslz9N-BRInNRQQTpDkCM5OY5P9nLMZ5INBFPYG8Q6aTprWE0AptkQEA0heqBoNIAFV3OSJAQf_nKcDW0zfR7x5MOWH-9t5PiI-phb1aZhw0vXQw0y5NnYlErdNkWsd4NEapaHPoCYBvB4TKC",
    status: "completed",
    scheduledAtLabel: "12/06, 09:00",
    serviceName: "Tiêm phòng dại",
    serviceType: "medical",
    providerName: "Healthy Paws Clinic",
  },
  {
    id: "booking-luna-bath",
    petName: "Luna",
    petBreed: "Mèo Xiêm",
    petImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNKKgPxmd_z6cDzHjCVn53pwRdj3KZ6-cdhX3_78_xrB6dkR7Aup9A7_IjJQYJ1OxAY812gpf4Vyi3uZCqC2NfN5_sgvMbgC3kly9i1AkI-QYPBxGsC8RbvaYvhIgNznZ9vuTzBDbWYRdTymXZ4C8tER1WiRweVOLF_d3Jru-bkbI_AOuiWgcTw5lnxKR2x31aeM-L3oreSjTGmdD4Haap98FbAyPRF76zqX8ujRF-C9236Q9tMK-zzOApDKtGPP7nYqsyWhkjNWLy",
    status: "cancelled",
    scheduledAtLabel: "02/06, 15:00",
    serviceName: "Tắm thú cưng cơ bản",
    serviceType: "grooming",
    providerName: "Happy Pet Spa",
  },
];
