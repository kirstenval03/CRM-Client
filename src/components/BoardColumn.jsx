import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BoardCard from './BoardCard'; 

const BoardColumn = ({ column, columnIndex, ...otherProps }) => {
  const { _id, title, cards } = column;

  return (
    <div className="board-column">
      <h2>{title}</h2>
      <Droppable droppableId={_id} type="card">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="card-list"
          >
            {cards.map((card, cardIndex) => (
              <BoardCard
                key={card._id}
                card={card}
                columnIndex={columnIndex}
                cardIndex={cardIndex}
                {...otherProps}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
