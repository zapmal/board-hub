import {
  getBoardLists,
  updateListOrder,
} from './listsService';

/**
 * lists: [done]
 * cards: []
 * final object like the below one: []
 */
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

const getLists = async (boardID, response) => {
  const lists = await getBoardLists(boardID);

  return lists;
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