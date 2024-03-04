import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanBoardPage = () => {
  const [boardContacts, setBoardContacts] = useState([
    { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { _id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    { _id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' },
  ]);

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const reorderedContacts = Array.from(boardContacts);
    const [removed] = reorderedContacts.splice(source.index, 1);
    reorderedContacts.splice(destination.index, 0, removed);

    setBoardContacts(reorderedContacts);
  };

  return (
    <div style={{ margin: '10px', padding: '10px', background: '#f0f0f0' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="contacts">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {boardContacts.map((contact, index) => (
                <Draggable
                  key={contact._id}
                  draggableId={contact._id.toString()} // Ensure the ID is a string
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        margin: '0 0 8px 0',
                        background: 'white',
                        padding: '10px',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div>{contact.firstName} {contact.lastName}</div>
                      <div>{contact.email}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoardPage;
