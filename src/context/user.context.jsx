import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./auth.context";
import { get } from "../services/authService"; // Import AuthContext if needed

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // State to store all users
  const { isLoggedIn } = useContext(AuthContext); // Use AuthContext to check if the user is logged in

  // Function to fetch and set the current user's data
  const fetchAndSetCurrentUser = () => {
    if (isLoggedIn) {
      // Assuming you have an endpoint to fetch the current user's data
      get("/users/current")
        .then((response) => {
          console.log("Current User", response.data);
          setCurrentUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Function to fetch and set all users
  const fetchAndSetAllUsers = () => {
    // Assuming you have an endpoint to fetch all users
    get("/users/all")
      .then((response) => {
        console.log("All Users", response.data);
        setAllUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch current user's data and all users when the user logs in
  useEffect(() => {
    fetchAndSetCurrentUser();
    fetchAndSetAllUsers();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, allUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
