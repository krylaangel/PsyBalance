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

  getPost: async (_id) => {
    set({ errorPost: null, loadingPost: true });
    try {
      const post = await postsService.fetchPost(_id);
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
  createPost: async (data) => {
    set({ errorPost: null, loadingPost: true });
    try {
      const post = await postsService.fetchCreatePost(data);
      if (post?.token) {
        localStorage.setItem("token", post.token);
      }
      set({ loadingPost: false, post: post.article });
      set((state) => ({ posts: [post.article, ...state.posts] }));

      return post.article;
    } catch (e) {
      set({
        errorPost: e?.message || ERRORS_MESSAGE.errorPosts,
        loadingPost: false,
      });
    }
  },
  deletePost: async (_id) => {
    set({ error: null, loading: true });
    try {
      await postsService.fetchDelete(_id);

      set((state) => ({
        loading: false,
        posts: state.posts.filter((post) => post._id !== _id),
      }));
    } catch (e) {
      console.error("Помилка при видаленні статті:", e);
    }
  },
  updatePost: async (data, _id) => {
    set({ error: null, loadingPost: true });
    try {
      const post = await postsService.fetchUpdatePost(_id, data);
      if (post?.token) {
        localStorage.setItem("token", post.token);
      }
      set({ loadingPost: false, post: post.article });
      set((state) => ({
        posts: state.posts.map((p) => (p._id === post._id ? post : p)),
        loadingPost: false,
      }));

      return post.article;
    } catch (e) {
      set({
        errorPost: e?.message || ERRORS_MESSAGE.errorPosts,
        loadingPost: false,
      });
    }
  },
}));
