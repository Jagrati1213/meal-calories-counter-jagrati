import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CalorieResult } from "@/types/calories";

interface MealState {
  currentResult: CalorieResult | null;
  history: CalorieResult[];
  setResult: (result: CalorieResult) => void;
  addToHistory: (result: CalorieResult) => void;
  clearHistory: () => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      currentResult: null,
      history: [],
      setResult: (result) => set({ currentResult: result }),
      addToHistory: (result) =>
        set((state) => ({
          history: [result, ...state.history].slice(0, 10), //last 10
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "calorie-tracker-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
