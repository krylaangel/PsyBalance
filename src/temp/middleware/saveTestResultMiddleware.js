import { addResult } from "@/temp/redux/slices/testResultsSlice.js";
import { useAuthStore } from "@/store/useAuthStore.js";
import { testResultsStorageService } from "@/service/testResultsStorageService.js";

export const saveTestResultMiddleware = () => (next) => (action) => {
  if (action.type === addResult.type) {
    const user = useAuthStore.getState().user;
    if (user) {
      const currentResult = testResultsStorageService.getResults();
      testResultsStorageService.setResults([...currentResult, action.payload]);
    }
  }
  return next(action);
};
