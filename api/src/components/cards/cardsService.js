import { card } from '@models';

const createCard = async (title, listID) => {
  const newCard = await card.create({ title, list_id: listID });

  return newCard;
};

const eraseCard = async (cardID) => {
  await card.destroy({ where: { id: cardID } });
};

const getSingleCard = async (cardID) => {
  const foundCard = await card.findByPk(cardID);

  return foundCard;
};

export {
  createCard,
  eraseCard,
  getSingleCard,
};
