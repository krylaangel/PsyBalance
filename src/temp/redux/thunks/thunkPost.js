import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsService } from "@/service/postsService.js";

export const thunkPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    try {
      return await postsService.fetchPost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Помилка");
    }
  },
);
