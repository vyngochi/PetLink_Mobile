export const mapIcon = (item: string) => {
  switch (item) {
    case "Grooming":
      return "ShowerHead";
    case "Veterinary":
      return "Hospital";
    case "Hotel":
      return "Hotel";
    default:
      return "PawPrint";
  }
};
