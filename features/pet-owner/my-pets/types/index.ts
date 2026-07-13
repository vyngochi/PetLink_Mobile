export type PetStatus = "active" | "inactive";

export type Pet = {
  id: string;
  name: string;
  breed: string;
  ageLabel: string;
  imageUrl: string;
  status: PetStatus;
  nextVaccineDate: string | null;
};

export type ApiPet = Omit<Pet, "status" | "nextVaccineDate"> & {
  status: string;
  nextVaccineDate: string | null;
};

export type MyPetsResponse = {
  pets: ApiPet[];
  total: number;
};
