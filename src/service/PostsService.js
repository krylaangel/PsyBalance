import axios from "axios";
import { SERVER_API_URL } from "@/constants/serviseApi.js";

export const PostsService = {
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
};
