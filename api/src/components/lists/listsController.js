import {
  getBoardLists,
  updateListOrder,
} from './listsService';

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
  console.log('lololol');
  await updateListOrder(previousListId, movedListOrder);
  await updateListOrder(movedListId, previousListOrder);

  return { message: 'Listas ordenadas exitosamente.' };
};

export {
  getLists,
  putOrder,
};