import { createSlice } from "@reduxjs/toolkit";
import { thunksPosts } from "@/service/thunks/thunksPosts.js";
import { thunkPost } from "@/service/thunks/thunkPost.js";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunksPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunksPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(thunksPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Помилка отримання постів";
      })
      .addCase(thunkPost.pending, (state) => {
        state.post = true;
      })
      .addCase(thunkPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(thunkPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Помилка отримання постів";
      });
  },
});
