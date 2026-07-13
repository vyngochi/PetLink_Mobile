export type PetDetailStatus = "active" | "inactive";

export type PetVitalStat = {
  label: string;
  value: string;
};

export type HealthReminder = {
  title: string;
  date: string;
};

export type MedicalRecord = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type PetDetail = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  ageLabel: string;
  status: PetDetailStatus;
  imageUrl: string;
  weight: string;
  height: string;
  color: string;
  criticalNote?: string;
  healthReminder?: HealthReminder;
  medicalRecords: MedicalRecord[];
  photos: string[];
};
