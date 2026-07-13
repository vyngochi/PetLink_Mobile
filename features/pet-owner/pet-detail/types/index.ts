import type {
  PetHealthReminder,
  PetMedicalRecord,
} from "@/features/pet-owner/shared/types";

export type PetDetailStatus = "active" | "inactive";

export type PetVitalStat = {
  label: string;
  value: string;
};

export type HealthReminder = PetHealthReminder;

export type MedicalRecord = PetMedicalRecord;

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

export type ApiPetDetail = Omit<
  PetDetail,
  "status" | "criticalNote" | "healthReminder" | "medicalRecords" | "photos"
> & {
  status: string;
  criticalNote: string | null;
  healthReminder: HealthReminder | null;
  medicalRecords: MedicalRecord[] | null;
  photos: string[] | null;
};
