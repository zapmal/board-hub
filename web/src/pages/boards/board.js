import React, { useEffect, useState } from 'react';
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

const Board = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { 
    data,
    isLoading,
    isError,
  } = useQuery('lists', async () => {
    const { data } = await apiClient.get(`/lists/all`, { params: { boardId: id } });
    return data;
  });
  const mutation = useMutation(data => apiClient.put('/lists/order', data), {
    onSuccess: () => {
      queryClient.invalidateQueries('lists');
    }
  });
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const unsortedLists = [];

    for (const key in data?.lists) {
      unsortedLists.push({
        id: data.lists[key].uid,
        name: data.lists[key].id,
        order: data.lists[key].order,
      });
    }

    const sortedLists = unsortedLists
      .sort((first, second) => first.order - second.order);

    setListOrder(sortedLists);
  }, [data]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      // Set the new (world) order.
      let newOrderObject = {
        ...listOrder,
        [source.index]: {
          ...listOrder[destination.index],
          order: listOrder[source.index].order,
        },
        [destination.index]: {
          ...listOrder[source.index],
          order: listOrder[destination.index].order,
        }
      };
      const dragDistance = Math.abs(listOrder[destination.index].order - listOrder[source.index].order);
      const dragDifference = dragDistance >= 3 ? 2 : 1;

      if (dragDistance !== 1) {
        if (source.index >= 2) {
          if (dragDistance === 3) {
            newOrderObject = {
              ...newOrderObject,
              [source.index]: {
                ...newOrderObject[source.index],
                order: newOrderObject[source.index - dragDifference].order,
              },
              [source.index - dragDifference]: {
                ...newOrderObject[source.index - dragDifference],
                order: newOrderObject[source.index - dragDifference + 1].order,
              },
              [source.index - dragDifference + 1]: {
                ...newOrderObject[source.index - dragDifference + 1],
                order: newOrderObject[source.index].order,
              }
            };
          }
          else {
            newOrderObject = {
              ...newOrderObject,
              [source.index]: {
                ...newOrderObject[source.index],
                order: newOrderObject[source.index - dragDifference].order,
              },
              [source.index - dragDifference]: {
                ...newOrderObject[source.index - dragDifference],
                order: newOrderObject[source.index].order,
              },
            };
          }
        }
        else {
          if (dragDistance === 3) {
            newOrderObject = {
              ...newOrderObject,
              [source.index]: {
                ...newOrderObject[source.index],
                order: newOrderObject[source.index + dragDifference].order,
              },
              [source.index + dragDifference]: {
                ...newOrderObject[source.index + dragDifference],
                order: newOrderObject[source.index + dragDifference - 1].order,
              },
              [source.index + dragDifference - 1]: {
                ...newOrderObject[source.index + dragDifference - 1],
                order: newOrderObject[source.index].order,
              }
            };
          }
          else {
            newOrderObject = {
              ...newOrderObject,
              [source.index]: {
                ...newOrderObject[source.index],
                order: newOrderObject[source.index + dragDifference].order,
              },
              [source.index + dragDifference]: {
                ...newOrderObject[source.index + dragDifference],
                order: newOrderObject[source.index].order,
              },
            };
          }
        }
      } 

      const newOrder = Array.from(
        Object.keys(newOrderObject)
          .map(l => newOrderObject[l])
          .sort((first, second) => first.order - second.order)
      );
      console.log(newOrder);

      setListOrder(newOrder);

      // await mutation.mutateAsync({
      //   sourceListId: listOrder[source.index].id,
      //   sourceListOrder: listOrder[source.index].order,
      //   destinationListId: listOrder[destination.index].id,
      //   destinationListOrder: listOrder[destination.index].order,
      //   boardId: Number(id),
      // });

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

      // Here the cards order needs to be updated.
      // setOrder(...);
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

    // Again, update the cards order.
    // setOrder(...);
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
            {listOrder.map(({ name }, index) => {
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
