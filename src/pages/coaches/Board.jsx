import React, { useState, useEffect } from "react";
import { useContacts } from "../../context/contact.context";
import { Grid, Paper, Typography, Card, CardContent, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import ContactDetails from "../../components/ContactDetails";

const BoardView = () => {
  const { eventId } = useParams();
  const { eventContacts } = useContacts();
  const [columns, setColumns] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const organizeColumns = () => {
      const initialColumns = {};

      eventContacts.forEach((contact) => {
        const pipelineStatus = contact.pipelineStatus;

        if (!initialColumns[pipelineStatus]) {
          initialColumns[pipelineStatus] = [];
        }

        initialColumns[pipelineStatus].push(contact);
      });

      const columnsArray = Object.entries(initialColumns).map(([title, contacts]) => ({
        title,
        contacts,
      }));

      setColumns(columnsArray);
    };

    organizeColumns();
  }, [eventContacts]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseContactDetails = () => {
    setSelectedContact(null);
  };

  const pastelColors = {
    green: "#D9EAD3",
    yellow: "#FFFDCC",
    red: "#F4CCCC",
  };

  return (
    <div className="board-container">
      <div className="columns-container">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="column">
            <Paper elevation={3} style={{ padding: "10px", minHeight: "200px" }}>
              <Typography variant="h6">{column.title}</Typography>
              <div className="column-content">
                {column.contacts.map((contact, contactIndex) => (
                  <Card
                    key={contact._id}
                    style={{ 
                      marginBottom: "10px", 
                      cursor: "pointer", 
                      backgroundColor: pastelColors[contact.statusColor] || "" // Use pastel colors
                    }}
                    onClick={() => handleContactClick(contact)}
                  >
                    <CardContent>
                      <Typography variant="body1">
                        {contact.firstName} {contact.lastName}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Paper>
          </div>
        ))}
      </div>
      {selectedContact && (
        <div className="overlay" onClick={handleCloseContactDetails}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <ContactDetails
              contact={selectedContact}
              eventId={eventId}
              onClose={handleCloseContactDetails}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseContactDetails}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardView;
