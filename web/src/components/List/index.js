import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { ListContainer, ListName, CardList } from './styles';

import InnerList from '../InnerList';

const List = ({ list, cards, index }) => {
  return (
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
          <Button>
            <AddIcon />
          </Button>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default List;