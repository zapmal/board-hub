import {
  createCard,
  eraseCard,
  getSingleCard,
} from './cardsService';

const newCard = async (title, listID) => {
  const card = await createCard(title, listID);

  return { message: 'Carta creada exitosamente.' };
};

const deleteCard = async (cardID, response) => {
  const card = await getSingleCard(cardID);

  if (!card) {
    response.status(404);
    return { message: 'La carta que intentas eliminar no existe.' };
  }

  await eraseCard(cardID);

  return {
    message: 'Carta eliminada satisfactoriamente.',
  };
};

const getCard = async (cardID, response) => {
  const card = await getSingleCard(cardID);

  if (!card) {
    response.status(404);
    return { message: 'La carta solicitada no existe.' };
  }

  return card;
};

export {
  newCard,
  deleteCard,
  getCard,
};
