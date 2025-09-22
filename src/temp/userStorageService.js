import { USER_KEY, USERS_KEY } from "@/constants/users.js";

export const userStorageService = {
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  getUsers: () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  setUsers: (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users)),
};
