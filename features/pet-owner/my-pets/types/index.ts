export type PetStatus = "active" | "inactive";

export type Pet = {
  id: string;
  name: string;
  breed: string;
  ageLabel: string;
  imageUrl: string;
  status: PetStatus;
  nextVaccineDate: string;
};
