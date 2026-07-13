import { Href } from "expo-router";
import { create } from "zustand";

interface RouteStore {
  intendedRoute?: Href;
  setIntendedRoute: (route: Href | null) => void;
}

export const useIntendedRoute = create<RouteStore>((set) => ({
  setIntendedRoute: (state: Href | null) => set({ intendedRoute: state! }),
}));
