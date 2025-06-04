import { create } from "zustand";
import { storageService } from "@/service/storageService.js";
export const useAuthStore = create((set) => ({
  user: storageService.getUser(),

  register: (newUser) => {
    const users = storageService.getUsers();
    if (users.find((user) => user.email === newUser.email)) {
      throw new Error("User already exists");
    }
    const updatedUsers = [...users, newUser];
    storageService.setUsers(updatedUsers);
    storageService.setUser(newUser);
    set({ user: newUser });
  },

  login: ({ email, password }) => {
    const users = storageService.getUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!foundUser) {
      throw new Error("Невірний email або пароль");
    }
    storageService.setUser(foundUser);
    set({ user: foundUser });
  },

  logout: () => {
    storageService.removeUser();
    set({ user: null });
  },
}));
