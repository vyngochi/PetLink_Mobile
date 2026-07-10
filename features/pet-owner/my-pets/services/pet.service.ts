import api from "@/api/client";

export const petService = {
  getMyPets: () => {
    return api.get("/mobile/pets/my-pets");
  },
};
