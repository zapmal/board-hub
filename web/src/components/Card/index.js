import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { CardContainer } from './styles';

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}  
        >
          {card.title}
        </CardContainer>
      )}
    </Draggable>
  );
};

export default Card;