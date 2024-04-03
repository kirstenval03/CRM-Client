import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, Typography } from '@mui/material';
import Card from './card'; // Import the Card component

const Column = ({ column }) => {
  const { title } = column;

  return (
    <Droppable droppableId={column._id} type="COLUMN">
      {(provided) => (
        <Paper className="column-container" ref={provided.innerRef} {...provided.droppableProps}>
          <div className="column">
            <Typography variant="h6" className="column-title">{title}</Typography>
            <div className="contacts">
              {column.contacts && column.contacts.map((contact, index) => (
                <Card key={contact._id} eventId={column._id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        </Paper>
      )}
    </Droppable>
  );
};

export default Column;
