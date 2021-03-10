import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteBorderIcon from '@material-ui/icons/DeleteOutlined';
import { Draggable } from 'react-beautiful-dnd';

import { CardContainer, ActionButtons } from './styles';

export const Card = ({ card, index }) => {
  const [isLocked, setIsLocked] = useState(false);

  const handleEditClick = (event) => {
    if (
      isLocked || 
      event.target.tagName === 'path' || 
      event.target.tagName === 'svg' || 
      event.target.tagName === 'BUTTON'
    ) {
      return;
    }

    alert('stuff');
  };

  const handleLockedClick = () => setIsLocked(!isLocked);

  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={isLocked}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDisabled={isLocked}
          onClick={handleEditClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}  
        >
          <span>{card.title}</span>
          <ActionButtons>
            <IconButton onClick={handleLockedClick}>
              {isLocked ? <LockIcon fontSize='small'/> : <LockOpenIcon fontSize='small'/>}
            </IconButton>
            <IconButton disabled={isLocked}>
              <DeleteBorderIcon fontSize='small' style={{ color:'#f44336' }}/>
            </IconButton>
          </ActionButtons>
        </CardContainer>
      )}
    </Draggable>
  );
};