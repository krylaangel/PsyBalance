import { create } from "zustand";

import axios from "axios";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  register: async (newUser) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const res = await axios.post("api/register", newUser, {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, token: res.data.token, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Помилка реєстрації",
        loading: false,
      });
      throw err;
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(
        "api/login",
        { email, password },
        { withCredentials: true },
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, token: res.data.token, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Невірний email або пароль",
        loading: false,
      });
      throw err;
    }
  },

  logout: async () => {
    try {
      await axios.post("api/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null });
    } catch (err) {
      console.error("Logout error", err);
    }
  },
  updateProfile: async (updates) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      const res = await axios.put("api/update", updates, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      set({ user: res.data.user, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Помилка оновлення профілю",
        loading: false,
      });
      throw err;
    }
  },
  fetchMe: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get("/api/me", {
        withCredentials: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      set({ user: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Не вдалося отримати користувача",
        loading: false,
      });
    }
  },
}));
