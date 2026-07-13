import api from "@/api/client";
import type {
  CreatePetPayload,
  UpdatePetPayload,
} from "@/features/pet-owner/shared/types";
import {
  buildPetFormData,
  hasLocalImages,
} from "@/features/pet-owner/shared/utils/pet-form-data";

const UPLOAD_TIMEOUT_MS = 60000;

const uploadConfig = { timeout: UPLOAD_TIMEOUT_MS };

export const petService = {
  getMyPets: () => {
    return api.get("/mobile/pets/my-pets");
  },
  getPetDetail: (petId: string) => {
    return api.get(`/mobile/pets/pet-detail/${petId}`);
  },
  createPet: (payload: CreatePetPayload) => {
    if (hasLocalImages(payload)) {
      return api.post(
        "/mobile/pets",
        buildPetFormData(payload),
        uploadConfig,
      );
    }
    return api.post("/mobile/pets", payload);
  },
  updatePet: (petId: string, payload: UpdatePetPayload) => {
    if (hasLocalImages(payload)) {
      return api.patch(
        `/mobile/pets/${petId}`,
        buildPetFormData(payload),
        uploadConfig,
      );
    }
    return api.patch(`/mobile/pets/${petId}`, payload);
  },
  deletePet: (petId: string) => {
    return api.delete(`/mobile/pets/${petId}`);
  },
};
