import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../services/SERVER_URL";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import AddLink from "../../components/AddLink";

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    // Extract eventId from the URL
    const pathname = window.location.pathname;
    const parts = pathname.split("/");
    const id = parts[parts.length - 1];
    setEventId(id);

    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/link/${id}`);
        setLinks(response.data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  const refreshLinks = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/link/${eventId}`);
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  return (
    <div>
      <Box mt={2} mb={2}>
        <Typography variant="h4">Links for Event</Typography>
        <AddLink eventId={eventId} refreshLinks={refreshLinks} />
        {links.length === 0 ? (
          <Typography>No links available for this event.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {links.map((link, index) => (
                  <TableRow key={index}>
                    <TableCell>{link.title}</TableCell>
                    <TableCell>
                      <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
};

export default LinksPage;

