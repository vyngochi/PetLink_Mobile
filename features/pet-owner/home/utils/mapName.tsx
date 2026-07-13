export const mapName = (v: string) => {
  switch (v) {
    case "Grooming":
      return "Tắm";
    case "Veterinary":
      return "Thú y";
    case "Hotel":
      return "Khách sạn";
    default:
      return "Unknown";
  }
};
