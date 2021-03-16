import {
  getBoardLists,
  updateListOrder,
} from './listsService';

const getLists = async (boardID, response) => {
  const [rawLists, rawCards] = await getBoardLists(boardID);
  const data = { cards: {}, lists: {} };

  for (const current of rawLists) {
    const key = current.name.toLowerCase();
    data.lists[key] = {
      id: key,
      uid: current.id,
      name: current.name,
      order: current.order,
      cardIds: current.listCards.map(card => card.id),
      board_id: current.board_id,
    };
  }

  for (const current of rawCards) {
    const key = current.id.toString();
    data.cards[key] = {
      id: key,
      title: current.title,
    };
  }

  return data;
};

const putOrder = async (
  previousListId,
  previousListOrder,
  movedListId,
  movedListOrder,
) => {
  await updateListOrder(previousListId, movedListOrder);
  await updateListOrder(movedListId, previousListOrder);

  return { message: 'Listas ordenadas exitosamente.' };
};

export {
  getLists,
  putOrder,
};