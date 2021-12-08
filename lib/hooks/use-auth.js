import React, { createContext, useContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const authContext = createContext();

function useProvideAuth() {
  // useLocalStorageState gör token-hanteringen mer synkad
  // Token sätts och läses från ett ställe
  const [token, setToken] = useLocalStorageState("token", "");
  const [redirect, setRedirect] = useState("/");

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
    setToken(data);
    return data;
  }

  function onGoogleLogin(response) {
    setToken(response.tokenId);
  }
  async function onLogout() {
    setToken("");
  }
  return {
    token,
    setToken,
    onLogin,
    onGoogleLogin,
    onLogout,
    redirect,
  };
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
