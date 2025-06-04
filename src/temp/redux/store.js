import { configureStore } from "@reduxjs/toolkit";
import { testResultsSlice } from "./testResultsSlice";
const store = configureStore({
  reducer: { testResults: testResultsSlice.reducer },
});
export default store;
