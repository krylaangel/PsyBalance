import { RESULT, RESULTS } from "@/constants/resultsTest.js";

export const testResultsStorageService = {
  getResults() {
    const results = localStorage.getItem(RESULTS);
    return results ? JSON.parse(results) : [];
  },

  setResults(results) {
    localStorage.setItem(RESULTS, JSON.stringify(results));
  },
  getResult: () => {
    const result = localStorage.getItem(RESULT);
    return result ? JSON.parse(result) : null;
  },
  setResult: (result) => {
    localStorage.setItem(RESULT, JSON.stringify(result));
  },
};
