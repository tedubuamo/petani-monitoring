"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

export default function Providers({ children }) {
  const [loggedUser, setLoggedUser] = useState({
    name: "",
    greenHouse: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
      const { id_gh, name } = userData.farmer[0];
      setLoggedUser({
        name: name,
        greenHouse: `Green House ${id_gh}`,
      });
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <NextUIProvider>{children}</NextUIProvider>
    </UserContext.Provider>
  );
}

export { UserContext };
