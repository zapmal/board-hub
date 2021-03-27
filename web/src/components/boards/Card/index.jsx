import React, { useState } from 'react';
import { IconButton} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteBorderIcon from '@material-ui/icons/DeleteOutlined';
import { Draggable } from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from 'react-query';
import { CardContainer, ActionButtons } from './styles';

import { EditCardDialog } from 'components/boards/Dialogs';

import useToggle from 'hooks/useToggle';

import apiClient from 'services/api';

export const Card = ({ card, index }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isOpen, toggleOpen] = useToggle(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(({ id }) => apiClient.delete(`/cards/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('lists');
    }
  });

  const handleEditClick = (event) => {
    if (
      isLocked || 
      event.target.tagName === 'path' || 
      event.target.tagName === 'svg' || 
      event.target.tagName === 'BUTTON'
    ) {
      return;
    }
    toggleOpen(!isOpen);
  };

  const handleLockedClick = () => setIsLocked(!isLocked);

  const handleDeleteCardClick = async (cardId) => {
    await mutation.mutateAsync({ id: cardId });
  };

  return (
    <>
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
              <IconButton 
                onClick={() => handleDeleteCardClick(card.id)}
                disabled={isLocked}
              >
                <DeleteBorderIcon fontSize='small' style={{ color:'#f44336' }}/>
              </IconButton>
            </ActionButtons>
          </CardContainer>
        )}
      </Draggable>
      {isOpen && (
        <EditCardDialog cardId={card.id} handleClose={toggleOpen} />
      )}
    </>
  );
};
