import React, { useState, useEffect } from "react";

const MainContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email,password) => {},
});

export default MainContext;

export const MainContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const setedItemInLocalStorage = localStorage.getItem("enteredData");
    if (setedItemInLocalStorage === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("enteredData");
    setIsLoggedIn(false);
  };

  const logInHandler = () => {
    localStorage.setItem("enteredData", "1");
    setIsLoggedIn(true);
  };

  return (
    <MainContext.Provider
      value={{ isLoggedIn, onLogout: logOutHandler, onLogin: logInHandler }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
