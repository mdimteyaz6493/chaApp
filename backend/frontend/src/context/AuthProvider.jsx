import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get jwt token from cookies (DON'T parse it)
  const jwt = Cookies.get("jwt");

  // Get user data from localStorage (this should be JSON)
  const localStorageData = localStorage.getItem("ChatApp");

  let initialUserState = null;

  try {
    if (localStorageData) {
      initialUserState = JSON.parse(localStorageData);
    }
  } catch (error) {
    console.error("Failed to parse user data:", error);
  }

  const [authUser, setAuthUser] = useState(initialUserState);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
