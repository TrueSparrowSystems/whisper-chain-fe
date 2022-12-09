import React, { useContext, useEffect, useState } from "react";
import { Constants } from "../utils/Constants";

export const AuthContext = React.createContext({
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

export function useAuthContext() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);

  return {
    isUserLoggedIn,
    setIsUserLoggedIn,
  };
}

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  useEffect(() => {
    if (typeof window != "undefined")
      setIsUserLoggedIn(
        !!localStorage.getItem(Constants.SESSION_STORAGE_ACCESS_TOKEN_KEY)
      );
  }, []);
  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn: isUserLoggedIn, setIsUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
