import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./auth.context";
import { get } from "../services/authService"; // Import AuthContext if needed

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // State to store all users
  const { isLoggedIn } = useContext(AuthContext); // Use AuthContext to check if the user is logged in

  //FETCH AND SET CURRENT USER DATA
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

  //SEE ALL USERS
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

   // UPDATE USER BY ID
   const updateUserById = (userId, updatedUserData) => {
    // Make a POST request to update a user by ID
    post(`/users/${userId}`, updatedUserData)
      .then((response) => {
        console.log("User updated", response.data);
        // You can update the user list or handle the updated user as needed
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //DELETE USER BY ID 
  const deleteUserById = (userId) => {
    // Make a DELETE request to delete a user by ID
    // Assuming you have an endpoint for deleting a user by ID
    fetch(`/users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // User deleted successfully
          console.log("User deleted successfully");
          
          // You can update the user list or handle the deleted user as needed
        } else if (response.status === 403) {
          // Access denied
          console.log("Access denied. You can only delete your own profile.");
        } else if (response.status === 404) {
          // User not found
          console.log("User not found");
        } else {
          // Handle other errors or display appropriate messages
          console.log("User deletion failed");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };


  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, allUsers, updateUserById, deleteUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
