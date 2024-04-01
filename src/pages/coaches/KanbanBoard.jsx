import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useBoard } from '../../context/Board/board';
import { useColumn } from '../../context/Board/column';
import { useContacts } from '../../context/contact.context';
import { useCard } from '../../context/Board/card';

const KanbanBoard = () => {
  const { eventId } = useParams();
  const { board, fetchEventBoard } = useBoard();
  const { columns, fetchEventColumns, createColumn } = useColumn();
  const { eventContacts, fetchContacts } = useContacts(); // Removed importContacts
  const { createCard, updateCard } = useCard(); // Added updateCard from useCard

  const [contactsFetched, setContactsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!board) {
        await fetchEventBoard(eventId);
      }
      if (!contactsFetched && board) {
        await fetchContacts(eventId);
        setContactsFetched(true);
        createCardsForContacts(); // Call the function after fetching contacts
      }
      if (columns.length === 0 && board) {
        await fetchEventColumns(eventId);
      }
    };

    fetchData();
  }, [eventId, board, contactsFetched, fetchEventBoard, fetchContacts, fetchEventColumns, createCard, columns]);

  const createCardsForContacts = async () => {
    try {
      // Iterate over eventContacts and create a card for each contact
      for (const contact of eventContacts) {
        await createCard(contact._id, contact.columnId); // Assuming contact has columnId
      }
    } catch (error) {
      console.error('Error creating cards:', error);
    }
  };

  const handleCreateColumn = () => {
    const title = prompt('Enter column title:');
    if (title) {
      createColumn(eventId, title);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Check if the draggable item was dropped outside of a droppable area
    if (!destination) {
      return;
    }

    // Check if the draggable item was dropped in a different location than its original location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the source and destination columns based on droppableId
    const sourceColumn = columns.find((column) => column._id === source.droppableId);
    const destinationColumn = columns.find((column) => column._id === destination.droppableId);

    // Find the dragged contact based on draggableId
    const draggedContact = eventContacts.find((contact) => contact._id === draggableId);

    // Update the columnId of the dragged contact to the destination column
    draggedContact.columnId = destinationColumn._id;

    // Your logic to update the state or API with the updated contact information
    // For example, you might use the updateCard function from the useCard context

    // Call the updateCard function to update the card with the new columnId
    updateCard(draggedContact._id, draggedContact.columnId);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Wealth Tax Blueprint
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {board && columns.length > 0 && (
            <>
              {columns.map((column, index) => (
                <Grid key={column._id} item xs={12} md={4}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">{column.title}</Typography>
                    <Droppable droppableId={column._id} type="CARD">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{ maxHeight: '400px', overflowY: 'auto' }} // Add scrollbar styles
                        >
                          {provided.placeholder}
                          {/* Display firstName and lastName of each contact */}
                          {column.title === 'Registrants' && (
                            <ul>
                              {eventContacts.map((contact, index) => (
                                <Draggable key={contact._id} draggableId={contact._id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Paper elevation={3} style={{ margin: '10px 0' }}>
                                        <Typography variant="body1">
                                          {contact.firstName} {contact.lastName}
                                        </Typography>
                                      </Paper>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </Paper>
                </Grid>
              ))}
              <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Button variant="contained" color="primary" onClick={handleCreateColumn}>
                    Add Column
                  </Button>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;
