import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { 
  DragDropContext,
  Droppable
} from 'react-beautiful-dnd';

import { InnerList } from 'components/boards';

import background from '../../assets/images/bg-2.jpg';

const Container = styled.div`
  padding: 6% 0 16% 0;
  display: flex;
  justify-content: center; 

  background-image: url(${background});
  background-position: center top;
  background-repeat: no-repeat;
`;

const initialData = {
  cards: {
    'card-1': { id: 'card-1', title: 'Task 1'},
    'card-2': { id: 'card-2', title: 'Task 2'},
    'card-3': { id: 'card-3', title: 'Task 3'},
    'card-4': { id: 'card-4', title: 'Task 4'},
  },
  lists: {
    'column-1': {
      id: 'column-1',
      name: 'Atrasado',
      cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
    },
    'column-2': {
      id: 'column-2',
      name: 'Pendiente',
      cardIds: [],
    },
    'column-3': {
      id: 'column-3',
      name: 'Haciendo',
      cardIds: [],
    },
    'column-4': {
      id: 'column-4',
      name: 'Terminado',
      cardIds: [],
    },
  },
  listOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

const Board = () => {
  const { id } = useParams(); 
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
     const { 
      destination, 
      source, 
      draggableId, 
      type 
    } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newListOrder = Array.from(data.listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        listOrder: newListOrder,
      };

      setData(newData);

      return;
    }

    const home = data.lists[source.droppableId];
    const foreign = data.lists[destination.droppableId];

    if (home === foreign) {
      const newCardIds = Array.from(home.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...home,
        cardIds: newCardIds,
      };

      const updatedData = {
        ...data,
        lists: {
          ...data.lists,
          [newList.id]: newList,
        },
      };

      setData(updatedData);

      return;
    }
    
    // Moving from one list to another.
    const startCardIds = Array.from(home.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...home,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(foreign.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...foreign,
      cardIds: finishCardIds,
    };

    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-lists' direction='horizontal' type='column'>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.listOrder.map((listId, index) => {
              const list = data.lists[listId];

              return (
                <InnerList 
                  key={list.id}
                  type='list'
                  list={list}
                  cards={data.cards}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;