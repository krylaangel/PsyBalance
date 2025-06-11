import { createAsyncThunk } from "@reduxjs/toolkit";
import { testResultsStorageService } from "@/service/testResultsStorageService.js";

export const thunkResults = createAsyncThunk(
  "results/fetchResults",
  async (_, thunkAPI) => {
    try {
      return testResultsStorageService.getResults();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Помилка");
    }
  },
);
