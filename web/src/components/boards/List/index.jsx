import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { ListContainer, ListName, CardList } from './styles';

import useToggle from 'hooks/useToggle';

import { InnerList } from '../InnerList';
import { NewCardDialog } from '../Dialogs';

export const List = ({ list, cards, index }) => {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <Draggable draggableId={list.id} index={index}>
        {(provided) => (
          <ListContainer {...provided.draggableProps} ref={provided.innerRef}>
            <ListName {...provided.dragHandleProps}>{list.name}</ListName>
            <Droppable droppableId={list.id} type='card'>
              {(provided, snapshot) => (
                <CardList
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                  {...provided.droppableProps}
                >
                  <InnerList cards={cards} />
                  {provided.placeholder}
                </CardList>
              )}
            </Droppable>
            <Button onClick={toggleOpen}>
              <AddIcon />
            </Button>
          </ListContainer>
        )}
      </Draggable>
      <NewCardDialog isOpen={isOpen} handleClose={toggleOpen} listId={list.uid} />
    </>
  );
};
