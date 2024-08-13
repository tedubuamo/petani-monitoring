"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useState } from "react";

const UserContext = createContext({});

export default function Providers({ children }) {
  const [loggedUser, setLoggedUser] = useState({
    name: "Tejo Suherman",
    greenHouse: "Green House 6",
  });

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <NextUIProvider>{children}</NextUIProvider>
    </UserContext.Provider>
  );
}

export { UserContext };
