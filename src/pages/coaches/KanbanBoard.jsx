import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useBoard } from '../../context/Board/board';
import { useColumn } from '../../context/Board/column';
import { useTask } from '../../context/Board/task';
import { AuthContext } from '../../context/auth.context';

const KanbanBoard = () => {
  const { user } = useContext(AuthContext);
  const { board, fetchUserBoard } = useBoard();
  const { columns, fetchBoardColumns, createColumn } = useColumn();
  const { tasks, fetchColumnTasks, createTask } = useTask();
  const [columnsFetched, setColumnsFetched] = useState(false);

  useEffect(() => {
    if (user && !board) {
      fetchUserBoard(user._id);
    }
  }, [fetchUserBoard, user, board]);

  useEffect(() => {
    if (board && !columnsFetched) {
      fetchBoardColumns(board._id);
      setColumnsFetched(true);
    }
  }, [board, fetchBoardColumns, columnsFetched]);

  const handleCreateColumn = () => {
    const title = prompt('Enter column title:');
    if (title) {
      createColumn(board._id, title, columns.length);
    }
  };

  const handleCreateTask = (columnId) => {
    const contactId = prompt('Enter task content:');
    if (contactId) {
      createTask(board._id, columnId, contactId, tasks.length);
    }
  };

  const handleDragEnd = (result) => {
    // Your handleDragEnd logic
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {board && (
            <>
              {board.columns.map((column) => (
                <Grid key={column._id} item xs={12} md={4}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">{column.title}</Typography>
                    <Droppable droppableId={column._id} type="TASK">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          {/* Render tasks here */}
                          {tasks
                            .filter((task) => task.columnId === column._id)
                            .map((task, index) => (
                              <div key={task._id}>{/* Render task component here */}</div>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCreateTask(column._id)} // Pass column id to handleCreateTask
                    >
                      Add Task
                    </Button>
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
