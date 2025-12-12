import axios from "axios";

export const postsService = {
  fetchPosts: async (page, limit) => {
    const response = await axios.get(`/api/posts?page=${page}&limit=${limit}`);
    return response.data.articles;
  },

  fetchPost: async (_id) => {
    const response = await axios.get(`/api/posts/${_id}`);
    return response.data.article;
  },
  fetchTotal: async () => {
    const response = await axios.get(`/api/posts?page=1&limit=1`);
    return response.data.pagination?.total || 0;
  },
  fetchDelete: async (_id) => {
    const response = await axios.delete(`/api/posts/${_id}`);
    return response.data;
  },
  fetchCreatePost: async (data) => {
    const response = await axios.post(`/api/posts`, data, {
      withCredentials: true,
    });
    return response.data;
  },
  fetchUpdatePost: async (_id, data) => {
    const response = await axios.patch(`/api/posts/${_id}`, data, {
      withCredentials: true,
    });
    return response.data;
  },
};
