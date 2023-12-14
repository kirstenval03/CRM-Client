import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      get("/auth/verify")
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false); // Set isLoading to false
          setUser(user);
        })
        .catch((error) => {
          removeToken();
          setIsLoggedIn(false);
          setIsLoading(false); // Set isLoading to false
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false); // Set isLoading to false
      setUser(null);
    }
  };

  const logOutUser = () => {
    removeToken();

    authenticateUser();
    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
