import { create } from "zustand";
import axios from "axios";
import { SERVER_API_URL } from "@/constants/serviseApi.js";

export const useTotalStore = create((set) => ({
  total: 0,
  fetchTotal: async () => {
    const response = await axios.get(`${SERVER_API_URL}/products?limit=1`);
    return set({ total: response.data.total });
  },
}));
