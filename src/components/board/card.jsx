import React, { useEffect } from 'react';
import { useCardContext } from '../../context/Board/card';
import { Draggable } from 'react-beautiful-dnd'; // Import Draggable from react-beautiful-dnd

const Card = ({ eventId, index }) => { // Accept index as a prop for Draggable
  const { cards, loading, fetchCards } = useCardContext();

  useEffect(() => {
    if (eventId) {
      fetchCards(eventId);
    }
  }, [eventId, fetchCards]);

  return (
    <div>
      {loading ? (
        <p>Loading cards...</p>
      ) : (
        <Draggable draggableId={cards[index]._id} index={index}> {/* Specify draggableId and index */}
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <p>{cards[index].contactId}</p>
            </div>
          )}
        </Draggable>
      )}
    </div>
  );
};

export default Card;
