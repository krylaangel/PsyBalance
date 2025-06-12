import { configureStore } from "@reduxjs/toolkit";

import { testResultsSlice } from "./slices/testResultsSlice.js";
import { postsSlice } from "@/temp/redux/slices/postsSlice.js";
import { saveTestResultMiddleware } from "@/temp/middleware/saveTestResultMiddleware.js";

const store = configureStore({
  reducer: { testResults: testResultsSlice.reducer, posts: postsSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveTestResultMiddleware),
});
export default store;
