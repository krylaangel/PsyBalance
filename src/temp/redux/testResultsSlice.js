import { createSlice } from "@reduxjs/toolkit";
import { RESULT } from "@/constants/resultsTest.js";
const savedResults = JSON.parse(localStorage.getItem(RESULT)) || [];

export const testResultsSlice = createSlice({
  name: "testResults",
  initialState: {
    results: savedResults,
  },
  reducers: {
    addResult: (state, action) => {
      state.results.push(action.payload);
      localStorage.setItem(RESULT, JSON.stringify(state.results));
    },
    removeResult: (state, action) => {
      state.results.splice(action.payload, 1);
      localStorage.setItem(RESULT, JSON.stringify(state.results));
    },
  },
});
export const { addResult, removeResult } = testResultsSlice.actions;
