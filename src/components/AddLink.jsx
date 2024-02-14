import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { SERVER_URL } from "../services/SERVER_URL";

const AddLink = ({ eventId, refreshLinks }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // State variable to toggle form visibility

  const handleAddLink = async () => {
    if (!title || !link) {
      setError("Title and URL are required");
      return;
    }
  
    try {
      const url = `${SERVER_URL}/link/new-link/${eventId}`;
      await axios.post(url, {
        title,
        link,
      });
      setTitle("");
      setLink("");
      setError("");
      refreshLinks();
    } catch (error) {
      console.error("Error adding link:", error);
      setError("An error occurred while adding the link");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the value of showForm
  };

  return (
    <Box mt={2}>
      <Button variant="contained" onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add Link"}
      </Button>
      {showForm && ( // Render the form only if showForm is true
        <>
          <Typography variant="h6">Add New Link</Typography>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" onClick={handleAddLink}>
            Add Link
          </Button>
        </>
      )}
    </Box>
  );
};

export default AddLink;
