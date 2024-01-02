import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BoardColumn from './BoardColumn'; // Create this component
import { useBoardLeads, fetchBoardLeads } from './board.context'; // Create this context and function

const LeadsBoardPage = () => {
  const { boardLeads, fetchBoardLeads, ...otherContextProps } = useBoardLeads();

  useEffect(() => {
    fetchBoardLeads();
  }, []);

  const onDragEnd = (result) => {
    // Handle drag-and-drop logic here
    // Update the order of columns and cards
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {boardLeads.map((column, columnIndex) => (
              <BoardColumn
                key={column._id}
                column={column}
                columnIndex={columnIndex}
                {...otherContextProps}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LeadsBoardPage;
