import {
  createCard,
  eraseCard,
  getSingleCard,
  updateCard,
  updateList,
  updateOrder,
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
  const card = await getSingleCard(cardID, true);

  if (!card) {
    response.status(404);
    return { message: 'La carta solicitada no existe.' };
  }

  return card;
};

const putCard = async (cardData) => {
  const didUpdate = await updateCard(cardData);

  if (!didUpdate) {
    return {
      message: 'Mmm, parece que hubo un error actualizando la carta.',
    };
  }

  return { message: 'Carta actualizada.' };
};

const changeCurrentList = async (cardId, destinationListId) => {
  await updateList(cardId, destinationListId);

  return { message: 'Cartas cambiadas de listas exitosamente.' };
};

const putVerticalOrder = async (cards) => {
  await updateOrder(cards);

  return { message: 'Cartas ordenadas exitosamente.' };
};

export {
  newCard,
  deleteCard,
  getCard,
  putCard,
  changeCurrentList,
  putVerticalOrder,
};
