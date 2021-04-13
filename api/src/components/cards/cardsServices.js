import { card, list } from '@models';

const createCard = async (title, listID) => {
  const allCards = await getAllCards(listID);
  const biggestOrder = allCards
    .map(c => c.order)
    .sort((first, second) => second - first)[0];
  const newCard = await card.create({ title, order: biggestOrder + 1, list_id: listID });

  return newCard;
};

const getAllCards = async (listID) => {
  const cards = await card.findAll({ where: { list_id: listID } });

  return cards;
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

const updateList = async (id, listId) => {
  await card.update({ list_id: listId }, { where: { id } });
};

const updateOrder = async (cards) => {
  for (const key in cards) {
    await card.update({ order: cards[key].order }, { where: { id: cards[key].card } });
  }
};

export {
  createCard,
  eraseCard,
  getSingleCard,
  updateCard,
  updateList,
  updateOrder,
};
