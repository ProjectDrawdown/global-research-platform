import React, { createContext, useEffect, useState } from "react";
import { fetchUser, refreshToken, patchUser, login } from "../api/api";
import { useLocalStorage } from "../helpers";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children, ...props }) => {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false);

  const loginU = async provider => {
    const res = await login(provider);
    window.location = res.url;
  };

  let intervalId
  const fetchUserFromAPI = async () => {
    const res = await fetchUser();
    setFetched(true);
    setUser(res);

    if (!intervalId) {
      // wait for a random bit, then try again
      setTimeout(async () => {
        if (!intervalId) {
          // if there's still no intervalId, then start the refresh interval
          intervalId = setInterval(async () => {
            const data = await refreshToken('google');

            if (data && data.access_token) {
              setToken(data.access_token);
            }
          }, 240000) // refresh token every four minutes
        }
      }, Math.floor(Math.random() * 10000))
    }
  };

  const patchUserFromAPI = async (data) => {
    const res = await patchUser(data);
    setUser(res);
  };
  const [token, setToken, removeToken] = useLocalStorage("token", null);
  useEffect(() => {
    if (token && !user) {
      fetchUserFromAPI(token);
    } else {
      setFetched(true);
    }
  }, [token, user]);
  const logoutU = async provider => {
    setUser(null);
    removeToken();
    window.location = "/login"
  };



  return (
    <UserContext.Provider value={{ user, setUser, fetchUserFromAPI, patchUserFromAPI, loginU, fetched, setToken, logoutU }}>
      {children}
    </UserContext.Provider>
  );
};
