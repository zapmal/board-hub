import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useQueryClient, useQuery, useMutation } from 'react-query';

import { InnerList, Status } from 'components/boards';

import apiClient from '../../services/api';

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
    '1': { id: '1', title: 'Task 1' },
    '2': { id: '2', title: 'Task 2' },
    '3': { id: '3', title: 'Task 3' },
    '4': { id: '4', title: 'Task 4' },
  },
  lists: {
    'atrasado': {
      id: 'atrasado',
      name: 'Atrasado',
      order: 1,
      cardIds: ['1', '2', '3', '4'],
    },
    'pendiente': {
      id: 'pendiente',
      name: 'Pendiente',
      order: 0,
      cardIds: [],
    },
    'haciendo': {
      id: 'haciendo',
      name: 'Haciendo',
      order: 2,
      cardIds: [],
    },
    'terminado': {
      id: 'terminado',
      name: 'Terminado',
      order: 3,
      cardIds: [],
    },
  },
};

const Board = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { 
    data: lists,
    isLoading,
    isError,
  } = useQuery('lists', async () => {
    const { data } = await apiClient.get(`/lists/all`, { params: { boardId: id } });
    return data;
  });
  const mutation = useMutation(data => apiClient.post('/lists/order', data), {
    onSuccess: () => {
      queryClient.invalidateQueries('lists');
    }
  });
  const [data, setData] = useState(initialData);

  const getListOrder = () => {
    const unorderedLists = lists.map(list => ({ 
      name: list.name.toLowerCase(), 
      order: list.order,
    }));

    const orderedLists = unorderedLists
      .sort((first, second) => first.order - second.order);

    return orderedLists;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const currentListOrder = getListOrder();

      const newData = {
        ...data,
        lists: {
          ...data.lists,
          [currentListOrder[source.index].name]: {
            ...data.lists[[currentListOrder[source.index].name]],
            order: currentListOrder[destination.index].order,
          },
          [currentListOrder[destination.index].name]: {
            ...data.lists[[currentListOrder[destination.index].name]],
            order: currentListOrder[source.index].order,
          },
        }
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

    // Moving a card from one list to another.
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

  if (isLoading) {
    return <Status status='loading' loading={isLoading}/>;
  }

  if (isError) {
    return <Status status='error' />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-lists' direction='horizontal' type='column'>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {getListOrder().map(({ name }, index) => {
              const list = data.lists[name];

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
