import React, { useState, useEffect } from "react";
import { useContacts } from "../../context/contact.context";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ContactDetails from "../../components/ContactDetails";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const BoardView = () => {
  const { eventId } = useParams();
  const { eventContacts, updateContact } = useContacts(); // Import updateContact from context
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const { source, destination } = result;
    const updatedColumns = [...columns];
    const sourceColumn = updatedColumns.find((col) => col.title === source.droppableId);
    const destColumn = updatedColumns.find((col) => col.title === destination.droppableId);
  
    // Get the dragged contact
    const draggedContact = sourceColumn.contacts[source.index];
    
    // Remove the dragged contact from the source column
    sourceColumn.contacts.splice(source.index, 1);
  
    // Insert the dragged contact into the destination column at the correct index
    destColumn.contacts.splice(destination.index, 0, draggedContact);
  
    setColumns(updatedColumns);
  
    // Call the updateContact function to update the contact in the backend
    updateContact(eventId, draggedContact._id, { pipelineStatus: destColumn.title });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        {columns.map((column, columnIndex) => (
          <Droppable key={columnIndex} droppableId={column.title}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="column"
                style={{
                  overflowY: snapshot.isDraggingOver ? "scroll" : "auto",
                  height: "100%",
                }}
              >
                <Paper elevation={3} style={{ padding: "10px", minHeight: "200px" }}>
                  <Typography variant="h6">{column.title}</Typography>
                  <div className="column-content">
                    {column.contacts.map((contact, contactIndex) => (
                      <Draggable key={contact._id} draggableId={contact._id} index={contactIndex}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              marginBottom: "10px",
                              cursor: "pointer",
                              backgroundColor: pastelColors[contact.statusColor] || "",
                            }}
                            onClick={() => handleContactClick(contact)}
                          >
                            <CardContent>
                              <Typography variant="body1">
                                {contact.firstName} {contact.lastName}
                              </Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </Paper>
              </div>
            )}
          </Droppable>
        ))}
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
    </DragDropContext>
  );
};

export default BoardView;
