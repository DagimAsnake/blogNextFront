import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = typeof localStorage !== 'undefined' ? localStorage.getItem("session") : null;

  const [token, setToken] = useState(initialToken);

  const IsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("session");
    }
  };

  const loginHandler = (token) => {
    setToken(token);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("session", token);
    }
  };

  const authContextValue = {
    token: token,
    isLoggedIn: IsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;