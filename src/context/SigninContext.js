import React, { useContext, useState } from "react";

export const SigninContext = React.createContext({
  isSigned: false,
  onSignin: () => {},
});

export function useSignin() {
  const { isSigned, onSignin } = useContext(SigninContext);

  return {
    isSigned,
    onSignin,
  };
}

export const SigninProvider = ({ children }) => {
  let profile;
  if (typeof window !== "undefined") {
    profile = window?.localStorage?.getItem("profileId") ? true : false;
  }
  const [isSigned, setIsSigned] = useState(profile);

  function onSignin(isSignedin) {
    setIsSigned(isSignedin);
  }
  return (
    <SigninContext.Provider value={{ isSigned, onSignin }}>
      {children}
    </SigninContext.Provider>
  );
};
