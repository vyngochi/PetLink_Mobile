export const mapIcon = (item: string) => {
  switch (item) {
    case "Grooming":
      return "ShowerHead";
    case "Veterinary":
      return "Hospital";
    case "Hotel":
      return "Hotel";
    case "Spa":
      return "Bubbles";
    case "Boarding":
      return "MapPinHouse";
    case "Training":
      return "Brain";
    default:
      return "PawPrint";
  }
};
