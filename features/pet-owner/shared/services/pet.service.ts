import api from "@/api/client";

export const petService = {
  getMyPets: () => {
    return api.get("/mobile/pets/my-pets");
  },
  getPetDetail: (petId: string) => {
    return api.get(`/mobile/pets/pet-detail/${petId}`);
  },
};
