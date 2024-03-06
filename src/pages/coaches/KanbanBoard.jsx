import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useBoard } from '../../context/Board/board';
import { useColumn } from '../../context/Board/column';
import { useTask } from '../../context/Board/task';

const KanbanBoard = () => {
  const { eventId } = useParams();
  const { board, fetchEventBoard } = useBoard();
  const { columns, fetchEventColumns, createColumn } = useColumn();
  const { tasks, fetchContacts, createTask } = useTask();

  const [contactsFetched, setContactsFetched] = useState(false);

  useEffect(() => {
    if (!board) {
      fetchEventBoard(eventId);
    }
  }, [eventId, board, fetchEventBoard]);

  useEffect(() => {
    if (board && !contactsFetched) {
      fetchContacts(eventId);
      setContactsFetched(true);
    }
  }, [board, eventId, contactsFetched, fetchContacts]);

  useEffect(() => {
    if (board && columns.length === 0) {
      fetchEventColumns(eventId);
    }
  }, [board, columns, fetchEventColumns, eventId]);

  const handleCreateColumn = () => {
    const title = prompt('Enter column title:');
    if (title) {
      createColumn(eventId, title, columns.length);
    }
  };

  const handleCreateTask = async (columnId) => {
    try {
      const contacts = await fetchContacts(eventId);
      const contactIds = contacts.map((contact) => contact._id);
      await createTask(eventId, columnId, contactIds, tasks.length);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDragEnd = (result) => {
    // Your handleDragEnd logic
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Wealth Tax Blueprint
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {board && (
            <>
              {columns.map((column, index) => (
                <Grid key={column._id} item xs={12} md={4}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">{column.title}</Typography>
                    <Droppable droppableId={column._id} type="TASK">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          {/* Render tasks here only for the first column */}
                          {index === 0 && tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Paper style={{ marginBottom: '10px', padding: '10px' }}>
                                    {task.firstName} {task.lastName}
                                  </Paper>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
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
