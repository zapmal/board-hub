import { list, card } from '@models';
import { Op } from 'sequelize';

const getBoardLists = async (boardID) => {
  const lists = await list.findAll({
    where: { board_id: boardID },
    include: {
      model: card,
      as: 'listCards',
      attributes: ['id', 'title'],
    },
  });
  const cards = await card.findAll({
    where: {
      list_id: {
        [Op.or]: lists.map(l => l.id),
      },
    },
    attributes: ['id', 'title'],
  });

  return [lists, cards];
};

const updateListOrder = async (id, order) => {
  await list.update({ order }, { where: { id } });
};

export {
  getBoardLists,
  updateListOrder,
};