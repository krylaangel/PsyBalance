import { createSlice } from "@reduxjs/toolkit";
import { testResultsStorageService } from "@/service/testResultsStorageService.js";
import { thunkResults } from "@/temp/redux/thunks/thunkResults.js";
import { ERRORS_MESSAGE } from "@/constants/errorsConstants.js";

export const testResultsSlice = createSlice({
  name: "results",
  initialState: {
    results: testResultsStorageService.getResults(),
    loading: false,
    error: null,
  },
  reducers: {
    addResult: (state, action) => {
      state.results.push(action.payload);
    },
    removeResult: (state, action) => {
      state.results = state.results.filter((_, i) => i !== action.payload);
      testResultsStorageService.setResults(state.results);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkResults.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(thunkResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload ?? [];
      })
      .addCase(thunkResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? ERRORS_MESSAGE.errorResults;
      });
  },
});
export const { addResult, removeResult } = testResultsSlice.actions;
