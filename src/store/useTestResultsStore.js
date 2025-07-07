import { create } from "zustand";
import { testResultsStorageService } from "@/service/testResultsStorageService.js";
import { ERRORS_MESSAGE } from "@/constants/errorsConstants.js";
import { useAuthStore } from "@/store/useAuthStore.js";

export const useTestResultsStore = create((set) => ({
  results: testResultsStorageService.getResults(),
  loading: false,
  error: null,

  addResult: (newResult) => {
    set({ error: null, loading: true });
    try {
      const user = useAuthStore.getState().user;
      const results = testResultsStorageService.getResults();

      if (user) {
        const updateResults = [...results, newResult];
        testResultsStorageService.setResults(updateResults);
        set({ results: updateResults, loading: false });
      }
    } catch (err) {
      set({
        error: err?.message || ERRORS_MESSAGE.errorResults,
        loading: false,
      });
    }
  },

  removeResult: (indexToRemove) => {
    set({ error: null, loading: true });
    try {
      const results = testResultsStorageService.getResults();
      const newResults = results.filter((_, i) => i !== indexToRemove);
      testResultsStorageService.setResults(newResults);
      set({ results: newResults, loading: false });
    } catch (err) {
      set({
        error: err?.message || ERRORS_MESSAGE.errorResults,
        loading: false,
      });
    }
  },
}));
