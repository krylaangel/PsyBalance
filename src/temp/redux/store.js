import { configureStore } from "@reduxjs/toolkit";
import { testResultsSlice } from "./testResultsSlice";
import { postsSlice } from "@/temp/redux/postsSlice.js";
const store = configureStore({
  reducer: { testResults: testResultsSlice.reducer, posts: postsSlice.reducer },
});
export default store;
