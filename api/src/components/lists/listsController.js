import {
  getBoardLists,
  updateListOrder,
  updateMultipleListsOrder,
} from './listsServices';

const getLists = async (boardID) => {
  const [rawLists, rawCards] = await getBoardLists(boardID);
  const data = { cards: {}, lists: {} };

  for (const list of rawLists) {
    const key = list.name.toLowerCase();
    data.lists[key] = {
      id: key,
      uid: list.id,
      name: list.name,
      order: list.order,
      cardIds: list.listCards
        .sort((first, second) => first.order - second.order)
        .map(card => card.id.toString()),
      boardId: list.boardId,
    };
  }

  for (const card of rawCards) {
    const key = card.id.toString();
    data.cards[key] = {
      id: key,
      title: card.title,
    };
  }

  return data;
};

const putOrder = async (newOrder, isLongDrag = false) => {
  if (isLongDrag) {
    await updateMultipleListsOrder(newOrder);
  } else {
    await updateListOrder(newOrder['source'].id, newOrder['source'].order);
    await updateListOrder(
      newOrder['destination'].id,
      newOrder['destination'].order
    );
  }

  return { message: 'Listas ordenadas exitosamente.' };
};

export { getLists, putOrder };
