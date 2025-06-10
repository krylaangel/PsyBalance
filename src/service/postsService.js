import axios from "axios";

import { SERVER_API_URL } from "@/constants/serviseApi.js";

export const postsService = {
  fetchPosts: async (page, limit) => {
    const response = await axios.get(
      `${SERVER_API_URL}/products?limit=${limit}&skip=${(page - 1) * limit}`,
    );
    return response.data.products;
  },

  fetchPost: async (id) => {
    const response = await axios.get(
      `${SERVER_API_URL}/products/${Number(id)}`,
    );
    return response.data;
  },
  fetchNeighborPosts: async (id) => {
    const prevId = Number(id) - 1;
    const nextId = Number(id) + 1;

    const [prevRes, nextRes] = await Promise.allSettled([
      axios.get(`${SERVER_API_URL}/products/${prevId}`),
      axios.get(`${SERVER_API_URL}/products/${nextId}`),
    ]);

    return {
      prevPost: prevRes.status === "fulfilled" ? prevRes.value.data : null,
      nextPost: nextRes.status === "fulfilled" ? nextRes.value.data : null,
    };
  },
};
