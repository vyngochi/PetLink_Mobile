export const mapName = (v: string) => {
  switch (v) {
    case "Grooming":
      return "Tắm";
    case "Veterinary":
      return "Thú y";
    case "Hotel":
      return "Khách sạn";
    case "Spa":
      return "Spa";
    case "Boarding":
      return "Lưu trú";
    case "Training":
      return "Huấn luyện";
    case "Other":
      return "Khác";
    default:
      return "Petlink";
  }
};
