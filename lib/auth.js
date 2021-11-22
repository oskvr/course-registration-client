import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (
      (typeof window !== undefined && localStorage.getItem("token")) ||
      user
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  async function onLogin(email, password) {
    const res = await fetch("https://localhost:44314/api/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.text();
    localStorage.setItem("token", data);
    setUser({ id: 1, name: "John Doe" });
    return data;
  }
  function onGoogleLogin(response) {
    localStorage.setItem("token", response.tokenId);
    setUser({ id: 1, name: "John Doe" });
  }
  async function onLogout() {
    window.localStorage.setItem("token", "");
    setUser(null);
  }
  return { user, isLoggedIn, onLogin, onGoogleLogin, onLogout, redirect };
}

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

export { useAuth, AuthProvider };
