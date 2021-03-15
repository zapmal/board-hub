import { list } from '@models';

const getBoardLists = async (boardID) => {
  const lists = await list.findAll({ where: { board_id: boardID } });

  return lists;
};

const updateListOrder = async (id, order) => {
  await list.update({ order }, { where: { id } });
};

export {
  getBoardLists,
  updateListOrder,
};