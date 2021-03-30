import { card, list } from '@models';

const createCard = async (title, listID) => {
  const newCard = await card.create({ title, list_id: listID });

  return newCard;
};

const eraseCard = async (cardID) => {
  await card.destroy({ where: { id: cardID } });
};

const getSingleCard = async (cardID, includeList = false) => {
  const foundCard = await card.findByPk(cardID);

  if (includeList) {
    const parentList = await list.findByPk(foundCard.list_id);
    return {
      ...foundCard.dataValues,
      list: parentList.name,
    };
  }

  return foundCard;
};

const updateCard = async (cardData) => {
  const didUpdate = await card.update({
    title: cardData.title,
    due_date: cardData.duedate,
    content: cardData.content,
    completed: cardData.completed,
  }, { where: { id: cardData.id } });

  return didUpdate !== 0;
};

const updateCardList = async (id, listId) => {
  await card.update({ list_id: listId }, { where: { id } });
};

export {
  createCard,
  eraseCard,
  getSingleCard,
  updateCard,
  updateCardList,
};
