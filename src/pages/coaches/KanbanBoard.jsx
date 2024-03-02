import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper } from "@mui/material";

const KanbanBoardPage = ({ eventId }) => { // Accept eventId as prop
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the backend using the eventId
    const fetchContacts = async () => {
      try {
        const response = await fetch(`/contact/board/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [eventId]);

  const handleDragEnd = (result) => {
    // Handle drag end
  };

  return (
    <div style={{ margin: "10px" }}>
      <Paper style={{ marginTop: "10px", overflowX: "auto" }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Implement your kanban board layout here */}
          <Droppable droppableId="contacts">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {contacts.map((contact, index) => (
                  <Draggable
                    key={contact.id}
                    draggableId={contact.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          margin: "8px",
                          backgroundColor: "white",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {/* Render your contact card here */}
                        <div>{contact.firstName} {contact.lastName}</div>
                        <div>{contact.email}</div>
                        {/* Include other contact information as needed */}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Paper>
    </div>
  );
};

export default KanbanBoardPage;

