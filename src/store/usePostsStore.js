import { create } from "zustand";
import { postsService } from "@/service/postsService.js";
import { ERRORS_MESSAGE } from "@/constants/errorsConstants.js";

export const usePostsStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,
  post: null,
  neighborPosts: { prevPost: null, nextPost: null },

  loadingPosts: false,
  loadingPost: false,
  loadingNeighbors: false,

  errorPosts: null,
  errorPost: null,
  errorNeighbors: null,

  getPost: async (id) => {
    set({ errorPost: null, loadingPost: true });
    try {
      const post = await postsService.fetchPost(id);
      set({ loadingPost: false, post: post });
    } catch (e) {
      set({
        errorPost: e?.message || ERRORS_MESSAGE.errorPosts,
        loadingPost: false,
      });
    }
  },
  getPosts: async (page, limit) => {
    set({ errorPosts: null, loadingPosts: true });
    try {
      const posts = await postsService.fetchPosts(page, limit);
      set({ loadingPosts: false, posts: posts });
    } catch (e) {
      set({
        errorPosts: e?.message || ERRORS_MESSAGE.errorPosts,
        loadingPosts: false,
      });
    }
  },
  getNeighborPosts: async (id) => {
    set({ errorNeighbors: null, loadingNeighbors: true });
    try {
      const neighborPosts = await postsService.fetchNeighborPosts(id);
      set({ loadingNeighbors: false, neighborPosts: neighborPosts });
    } catch (e) {
      set({
        errorNeighbors: e?.message || ERRORS_MESSAGE.errorPosts,
        loadingNeighbors: false,
      });
    }
  },
}));
