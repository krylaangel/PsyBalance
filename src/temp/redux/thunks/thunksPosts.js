import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsService } from "@/service/postsService.js";

export const thunksPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page, limit }, thunkAPI) => {
    try {
      return await postsService.fetchPosts(page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Помилка");
    }
  },
);
