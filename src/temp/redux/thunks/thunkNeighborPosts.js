import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsService } from "@/service/postsService.js";

export const thunkNeighborPosts = createAsyncThunk(
  "posts/fetchNeighborPosts",
  async (id, thunkAPI) => {
    try {
      return await postsService.fetchNeighborPosts(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Помилка");
    }
  },
);
