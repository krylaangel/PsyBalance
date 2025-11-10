import { create } from "zustand";

import { ERRORS_MESSAGE } from "@/constants/errorsConstants.js";
import { postsService } from "@/service/postsService.js";

export const useTotalStore = create((set) => ({
  total: 0,
  totalLoading: false,
  totalError: null,
  fetchTotal: async () => {
    set({ totalError: null, totalLoading: true });

    try {
      const total = await postsService.fetchTotal();
      return set({ total: total, totalLoading: false });
    } catch (error) {
      set({
        totalError: error?.message || ERRORS_MESSAGE.errorTotal,
        totalLoading: false,
      });
    }
  },
}));
