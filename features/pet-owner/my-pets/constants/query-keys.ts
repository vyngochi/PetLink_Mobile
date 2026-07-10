export const petKeys = {
  all: ["pets"] as const,
  lists: () => [...petKeys.all, "list"] as const,
  myPets: () => [...petKeys.lists(), "my-pets"] as const,
};
