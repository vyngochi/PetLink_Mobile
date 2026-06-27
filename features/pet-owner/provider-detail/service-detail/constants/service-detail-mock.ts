import { ServiceDetailItem } from '../types/service-detail.type';

export const MOCK_SERVICE_DETAILS: ServiceDetailItem[] = [
  {
    id: '66f1a2b3c4d5e6f789000001',
    providerId: '66f1a2b3c4d5e6f789012345',
    providerName: 'Happy Pet Spa',
    name: 'Tắm thú cưng cơ bản',
    price: 80000,
    durationMinutes: 45,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd31QW5DcIHl1gRrwGk5YyMTw2N0HgAyknpHgY10AOZVV7PIU5cIay4n3fJKFZmsEFw2EvbAkQhpNf1HytA5Nzyv0ufxuXBO71YkzYlbChyJYsjoge6OEZc8qqPF6twEMOCWM2t-DMfHilOZ0KoiaRejTMuj9z5E2wp40pGh91OMYKWkzcU9bcNcvcmrygQ4aHvojTy12qR84_1r9EXHls_0TDRcC9rfrObk-a4y4ZzYP8w5S_64-qxlLGGHac8-YKOJH0-yhF18qx',
    description: 'Làm sạch sâu lông, massage thư giãn, cắt tỉa móng cơ bản.',
    longDescription: 'Gói tắm thú cưng cơ bản được thiết kế để mang lại cho người bạn nhỏ của bạn một diện mạo mới mẻ và sạch sẽ nhất. Chúng tôi sử dụng các loại sữa tắm chuyên dụng, an toàn cho da nhạy cảm. Quá trình tắm kết hợp massage giúp bé thư giãn hoàn toàn. Ngoài ra, gói còn bao gồm cắt tỉa móng cơ bản để đảm bảo an toàn cho bé và gia đình.',
    targetPets: ['Chó nhỏ (<10kg)', 'Chó vừa (10-20kg)', 'Mèo'],
    benefits: [
      'Sử dụng sữa tắm hữu cơ an toàn cho da',
      'Kỹ thuật viên hơn 3 năm kinh nghiệm',
      'Quy trình massage thư giãn độc quyền',
      'Khử mùi hôi hiệu quả lên đến 7 ngày'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '66f1a2b3c4d5e6f789000002',
    providerId: '66f1a2b3c4d5e6f789012345',
    providerName: 'Happy Pet Spa',
    name: 'Grooming combo',
    price: 250000,
    durationMinutes: 90,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUbxKMNBmdj89mzldXcQLqlQ13RP6mFxZ-APKGyMui_4yWkow05d_-cC_8WhwmPSnDAmaJglrMvWTKpobWJLBOCThjLgzZu-glpUPS6cZtQcKG7zN6jOfDuY4F4QQV0ITsreCz4D1jcGJXZDCIqPDlm5zqqK24L-Ke47kHQfd5dlhAwtKLB_lidxdVU4so6ssofGcmQX8QMyeDi0kixsnI5G0CDB9a4CY-25BcHdL0wAf-hq-3MIFLTIrGmrfy4TQmqXh7HYzv0wXx',
    description: 'Tắm gội, sấy khô bồng bềnh, cắt tạo kiểu toàn thân chuyên nghiệp.',
    longDescription: 'Grooming combo là dịch vụ toàn diện giúp lột xác hoàn toàn cho thú cưng của bạn. Từ việc làm sạch sâu đến việc thiết kế và cắt tạo kiểu lông theo xu hướng mới nhất hoặc theo yêu cầu riêng của bạn. Đảm bảo bé nhà bạn sẽ có một diện mạo hoàn hảo và phong cách nhất.',
    targetPets: ['Chó Poodle', 'Chó Phốc Sóc', 'Chó lông dài'],
    benefits: [
      'Cắt tạo kiểu chuyên nghiệp theo chuẩn quốc tế',
      'Sử dụng kéo cụp và tông đơ không gây ồn',
      'Tặng kèm nơ/cà vạt xinh xắn sau khi làm đẹp',
      'Dưỡng lông mềm mượt bồng bềnh'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop'
    ]
  }
];
