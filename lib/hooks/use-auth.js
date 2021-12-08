import React, { createContext, useContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { BASE_URL } from "../api/helpers";

const authContext = createContext();

function useProvideAuth() {
  // useLocalStorageState gör token-hanteringen mer synkad
  // Token sätts och läses från ett ställe
  const [token, setToken] = useLocalStorageState("token", "");
  const [redirect, setRedirect] = useState("/");

  async function onLogin(email, password) {
    const res = await fetch(BASE_URL + "/auth/login", {
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

  async function onGoogleLogin(response) {
    const googleToken = response.tokenId;
    const res = await fetch(BASE_URL + "/auth/googleLogin", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ googleToken }),
    });
    const data = await res.text();
    setToken(data);
    return res;
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
