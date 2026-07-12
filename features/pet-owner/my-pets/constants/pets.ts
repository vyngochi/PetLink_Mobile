import type { Pet } from "@/features/pet-owner/my-pets/types";

export const myPets: Pet[] = [
  {
    id: "bella",
    name: "Bella",
    breed: "Golden Retriever",
    ageLabel: "3 tuổi",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMBwJa2m0SA3QeppmAcW22QRlks3aUTNMP6sQkr3svQjcq7Al3Gae-aT8EjW5VpHUM5pi8BzCYnRzRt4fru9hRL90W6qoZehEa1m0B6DSvkfHVXFAbCSjABH4XBiiFvkImjWEirAqaUp5Tb0OaGLC0KQWWqVaT-FZtYLS4Pab5Uu3PsxvwSGp42zKzfgFGFj3t4PP6TmfLXGORUlzC27dKBAKWlP00IoleZnKjpruTFk17BGlBusmsXfgxuQwvikKhR-0lx4t5el1F",
    status: "active",
    nextVaccineDate: "12 Th12, 2024",
  },
  {
    id: "luna",
    name: "Luna",
    breed: "Mèo Xiêm",
    ageLabel: "2 tuổi",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9kpYBJk2Ua805d2WQOxXLrinqXV7BFTigb1GyWgHyezLochchY-TKbt1oOEKo4XuYIcZDJRFvJvlFFScCrXZLncseUC5WoTgUes2QH_C6a_m-MeCDOZKzYAFUtRWD0XzqP7vFgZCfJWTiokXwyGKls7tH31q3NqaDjvM_jMetDwT5A-zFhW7FK0YVRuvnQxwALOXgqcreJIl4d0rd0PjBKKBV7AowQoAHLwNAQbMoC6sK9CGx3Ybgz8_5IIkOUWP5GJFQ552rJpLr",
    status: "active",
    nextVaccineDate: "05 Th1, 2025",
  },
];
