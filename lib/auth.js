import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "./api/helpers";

const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState("/");
  const isLoggedIn = user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserAsync().then((data) => {
        if (data.userId) {
          setUser(data);
        } else {
          console.log("Bad token");
          localStorage.setItem("token", "");
        }
      });
    }
  }, []);

  async function getUserAsync() {
    const token = localStorage.getItem("token");
    const res = await fetch(BASE_URL + "/User", {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  }
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     getUserAsync().then(setUser);
  //   }
  // }, [isLoggedIn]);

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
    getUserAsync().then(setUser);
    return data;
  }
  function onGoogleLogin(response) {
    localStorage.setItem("token", response.tokenId);
    setIsLoggedIn(true);
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
