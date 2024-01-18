import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UserContext } from "../context/user.context";

const UpdateUser = ({ open, onClose, user }) => {
  const { updateUserById } = useContext(UserContext);

  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    if (user && user.id) {
      // Fetch the user's data from the database using their ID
      fetchUserData(user.id);
    }
  }, [user]);

  const fetchUserData = (userId) => {
    // Make an API call to fetch user data by ID
    fetch(`/api/users/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        // Set the retrieved user data in the state
        setUpdatedUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = () => {
    // Update user data directly in the UserContext
    updateUserById(user.id, updatedUser);

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <DialogContentText>Update user information:</DialogContentText>
        <TextField
          name="firstName"
          label="First Name"
          value={updatedUser.firstName || ""}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={updatedUser.lastName}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          name="email"
          label="Email"
          value={updatedUser.email}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={updatedUser.phoneNumber}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          name="position"
          label="Position"
          value={updatedUser.position}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          name="role" // Use a different name attribute
          label="Access level"
          value={updatedUser.role}
          onChange={handleFieldChange}
          fullWidth
        />
        {/* Add other fields as needed */}
        </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUser;

