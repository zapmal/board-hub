import { list, card } from '@models';
import { Op } from 'sequelize';

const getBoardLists = async (boardID) => {
  const rawLists = await list.findAll({
    where: { board_id: boardID },
    include: {
      model: card,
      as: 'listCards',
      attributes: ['id', 'title'],
    },
  });
  const rawCards = await card.findAll({
    where: {
      list_id: {
        [Op.or]: rawLists.map(l => l.id),
      },
    },
    attributes: ['id', 'title'],
  });

  const data = { cards: {}, lists: {} };

  for (const current of rawLists) {
    const key = current.name.toLowerCase();
    data.lists[key] = {
      id: key,
      uid: current.id,
      name: current.name,
      order: current.order,
      cardIds: current.listCards.map(c => c.id),
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

const updateListOrder = async (id, order) => {
  await list.update({ order }, { where: { id } });
};

export {
  getBoardLists,
  updateListOrder,
};