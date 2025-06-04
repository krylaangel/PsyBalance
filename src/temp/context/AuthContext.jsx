import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === newUser.email)) {
      throw new Error("User already exists");
    }
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };
  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!foundUser) {
      throw new Error("Невірний email або пароль");
    }
    localStorage.setItem("user", JSON.stringify(foundUser));
    setUser(foundUser);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
