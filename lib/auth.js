import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function useProvideAuth() {
  const [user, setUser] = useState();
  const isLoggedIn = user;

  async function login() {
    // Logik för att logga in
    setUser({ id: 1, name: "John Doe" });
  }
  function googleLogin() {
    // Logik för Google login
  }
  async function logout() {
    // Logik för att logga ut
    setUser(null);
    // Ta bort token osv
  }
  return { user, isLoggedIn, login, googleLogin, logout };
}

export { useAuth, AuthProvider };
