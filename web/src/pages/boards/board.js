import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useQueryClient, useQuery, useMutation } from 'react-query';

import { InnerList, Status } from 'components/boards';

import apiClient from 'services/api';

import background from 'assets/images/bg-2.jpg';

const Container = styled.div`
  padding: 6.5% 0 16% 0;
  display: flex;
  justify-content: center;

  background-image: url(${background});
  background-position: center top;
  background-repeat: no-repeat;
`;

/**
 * This is specifically for the drag of lists.
 */
const handleDrag = (
  draggedElement,
  dragDifference,
  sourceIndex,
  isLongDrag = false,
  rightToLeft = false
) => {
  const operation = rightToLeft
    ? sourceIndex - dragDifference
    : sourceIndex + dragDifference;
  // const steps = 0;

  if (isLongDrag) {
    return {
      ...draggedElement,
      [sourceIndex]: {
        ...draggedElement[sourceIndex],
        order: draggedElement[operation].order,
      },
      [operation]: {
        ...draggedElement[operation],
        order:
          draggedElement[rightToLeft ? operation + 1 : operation - 1].order,
      },
      [rightToLeft ? operation + 1 : operation - 1]: {
        ...draggedElement[rightToLeft ? operation + 1 : operation - 1],
        order: draggedElement[sourceIndex].order,
      },
    };
  } else {
    return {
      ...draggedElement,
      [sourceIndex]: {
        ...draggedElement[sourceIndex],
        order: draggedElement[operation].order,
      },
      [operation]: {
        ...draggedElement[operation],
        order: draggedElement[sourceIndex].order,
      },
    };
  }
};

const Board = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: fetchedData, isLoading, isError } = useQuery(
    'lists',
    async () => {
      const { data } = await apiClient.get(`/lists/all`, {
        params: { boardId: id },
      });
      return data;
    }
  );
  const listOrderMutation = useMutation(
    (data) => apiClient.put('/lists/order', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('lists');
      },
    }
  );
  const changeListMutation = useMutation(
    (data) => apiClient.put(`/cards/${data.id}/update-list`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('lists');
      },
    }
  );
  const [data, setData] = useState([]);
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const unsortedLists = [];

    for (const key in fetchedData?.lists) {
      unsortedLists.push({
        id: fetchedData.lists[key].uid,
        name: fetchedData.lists[key].id,
        order: fetchedData.lists[key].order,
      });
    }

    const sortedLists = unsortedLists.sort(
      (first, second) => first.order - second.order
    );

    setListOrder(sortedLists);
    setData(fetchedData);
  }, [fetchedData]);

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
        },
      };

      const dragDistance = Math.abs(
        listOrder[destination.index].order - listOrder[source.index].order
      );
      const isLongDrag = dragDistance >= 3;
      const dragDifference = isLongDrag ? 2 : 1;

      if (dragDistance !== 1) {
        if (source.index >= 2) {
          newOrderObject = isLongDrag
            ? handleDrag(
                newOrderObject,
                dragDifference,
                source.index,
                isLongDrag,
                true
              )
            : handleDrag(
                newOrderObject,
                dragDifference,
                source.index,
                isLongDrag,
                true
              );
        } else {
          newOrderObject = isLongDrag
            ? handleDrag(
                newOrderObject,
                dragDifference,
                source.index,
                isLongDrag
              )
            : handleDrag(
                newOrderObject,
                dragDifference,
                source.index,
                isLongDrag
              );
        }
      }

      const newOrder = Array.from(
        Object.keys(newOrderObject)
          .map((l) => newOrderObject[l])
          .sort((first, second) => first.order - second.order)
      );

      setListOrder(newOrder);

      if (dragDistance >= 2) {
        await listOrderMutation.mutateAsync({
          newOrder,
          isLongDrag: true,
          boardId: Number(id),
        });
      } else {
        await listOrderMutation.mutateAsync({
          newOrder: {
            source: newOrder[source.index],
            destination: newOrder[destination.index],
          },
          boardId: Number(id),
        });
      }

      return;
    }

    const home = data.lists[source.droppableId];
    const foreign = data.lists[destination.droppableId];

    if (home === foreign) {
      const newCardIds = Array.from(home.cardIds);
      const cardsOrder = new Map();

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      newCardIds.forEach((cardId, index) => cardsOrder.set(cardId, index));

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
      // send cardsOrder and that'll persist the vertical order
      // of the cards

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

    // Updates the current (moved) card list id
    await changeListMutation.mutateAsync({
      id: data.cards[draggableId].id,
      destinationListId: foreign.uid,
    });
  };

  if (isLoading || data?.length === 0) {
    return (
      <Status status='loading' loading={isLoading || data?.length === 0} />
    );
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
