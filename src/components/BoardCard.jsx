import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const BoardCard = ({ card, columnIndex, cardIndex, updateCardPosition, ...otherProps }) => {
  const { _id, title, description } = card;

  const handleCardDragEnd = (result) => {
    // Handle the card drag-and-drop logic here
    if (!result.destination) {
      return; // Card was dropped outside of a valid droppable area
    }

    // Update the card position in the backend
    const newPosition = result.destination.index;
    updateCardPosition(_id, columnIndex, cardIndex, newPosition);
  };

  return (
    <Draggable draggableId={_id} index={cardIndex}>
      {(provided) => (
        <div
          className="board-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{title}</h3>
          <p>{description}</p>
          {/* Add additional card content here */}
        </div>
      )}
    </Draggable>
  );
};

export default BoardCard;
