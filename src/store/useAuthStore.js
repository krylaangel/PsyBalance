import { create } from "zustand";

import { userStorageService } from "@/service/userStorageService.js";

export const useAuthStore = create((set) => ({
  user: userStorageService.getUser(),

  register: (newUser) => {
    const users = userStorageService.getUsers();
    if (users.find((user) => user.email === newUser.email)) {
      throw new Error("User already exists");
    }
    const updatedUsers = [...users, newUser];
    userStorageService.setUsers(updatedUsers);
    userStorageService.setUser(newUser);
    set({ user: newUser });
  },

  login: ({ email, password }) => {
    const users = userStorageService.getUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!foundUser) {
      throw new Error("Невірний email або пароль");
    }
    userStorageService.setUser(foundUser);
    set({ user: foundUser });
  },

  logout: () => {
    userStorageService.removeUser();
    set({ user: null });
  },
}));
