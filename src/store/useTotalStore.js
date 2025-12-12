import { create } from "zustand";
import axios from "axios";

import { SERVER_API_URL } from "@/constants/serviseApi.js";
import { ERRORS_MESSAGE } from "@/constants/errorsConstants.js";

export const useTotalStore = create((set) => ({
  total: 0,
  totalLoading: false,
  totalError: null,
  fetchTotal: async () => {
    set({ totalError: null, totalLoading: true });

    try {
      const response = await axios.get(`${SERVER_API_URL}/products?limit=1`);
      return set({ total: response.data.total, totalLoading: false });
    } catch (error) {
      set({
        totalError: error?.message || ERRORS_MESSAGE.errorTotal,
        totalLoading: false,
      });
    }
  },
}));
