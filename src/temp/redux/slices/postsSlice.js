import { createSlice } from "@reduxjs/toolkit";
import { thunksPosts } from "@/temp/redux/thunks/thunksPosts.js";
import { thunkPost } from "@/temp/redux/thunks/thunkPost.js";
import { thunkNeighborPosts } from "@/temp/redux/thunks/thunkNeighborPosts.js";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    post: null,
    loadingPost: false,
    neighborPosts: { prevPost: null, nextPost: null },
    loadingNeighbors: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunksPosts.pending, (state) => {
        state.error = null;
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
        state.error = null;
        state.loadingPost = true;
      })
      .addCase(thunkPost.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.post = action.payload;
      })
      .addCase(thunkPost.rejected, (state, action) => {
        state.loadingPost = false;
        state.error = action.payload ?? "Помилка отримання постів";
      })
      .addCase(thunkNeighborPosts.pending, (state) => {
        state.error = null;
        state.loadingNeighbors = true;
      })
      .addCase(thunkNeighborPosts.fulfilled, (state, action) => {
        state.loadingNeighbors = false;
        state.neighborPosts = {
          prevPost: action.payload.prevPost,
          nextPost: action.payload.nextPost,
        };
      })
      .addCase(thunkNeighborPosts.rejected, (state, action) => {
        state.loadingNeighbors = false;
        state.error = action.payload ?? "Помилка отримання постів";
      });
  },
});
