export type PetHealthReminder = {
  title: string;
  date: string;
};

export type PetMedicalRecord = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type CreatePetPayload = {
  name: string;
  breed: string;
  gender: string;
  ageLabel: string;
  imageUrl: string;
  weight: string;
  height: string;
  color: string;
  status?: string;
  criticalNote?: string | null;
  nextVaccineDate?: string | null;
  photos?: string[];
  healthReminder?: PetHealthReminder | null;
  medicalRecords?: PetMedicalRecord[];
};

export type UpdatePetPayload = Partial<CreatePetPayload>;
