import type { MarkerDetail } from "@/types";
import { create } from "zustand";

interface ChosenMarkerStore {
  chosenMarker: MarkerDetail | null;
  // eslint-disable-next-line no-unused-vars
  setChosenMarker: (chosenMarker: MarkerDetail) => void;
  resetMarker: () => void;
}

export const useChosenMarkerStore = create<ChosenMarkerStore>((set) => ({
  chosenMarker: null,
  setChosenMarker: (chosenMarker) => set({ chosenMarker }),
  resetMarker: () => set({ chosenMarker: null }),
}));
