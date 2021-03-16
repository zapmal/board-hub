import {
  getBoardLists,
  updateListOrder,
} from './listsService';

const getLists = async (boardID, response) => {
  const [rawLists, rawCards] = await getBoardLists(boardID);
  const data = { cards: {}, lists: {} };

  for (const list of rawLists) {
    const key = list.name.toLowerCase();
    data.lists[key] = {
      id: key,
      uid: list.id,
      name: list.name,
      order: list.order,
      cardIds: list.listCards.map(card => card.id),
      board_id: list.board_id,
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