import {
  createBoard,
  getUserBoards,
  getFavoriteBoards,
  eraseBoard,
  getSingleBoard,
  toggleFavoriteBoard,
  createDefaultLists,
} from './boardsService';

const newBoard = async (data, response) => {
  const board = await createBoard(data.userID, data.name, data.description, data.isFavorite);
  const lists = await createDefaultLists(board.id);

  if (lists.length === 0) {
    await eraseBoard(board.id);
    response.status(500);
    return {
      message: 'Ha ocurrido un error creando el tablero, intentelo de nuevo más tarde.',
    };
  }

  return {
    message: 'Tablero creado exitosamente.',
    board,
  };
};

const getBoards = async (userID, response) => {
  const boards = await getUserBoards(userID);

  if (!boards) {
    response.status(404);
    return {};
  }

  return boards;
};

const getFavorites = async (userID, response) => {
  const boards = await getFavoriteBoards(userID);

  if (!boards) {
    response.status(404);
    return {};
  }

  return boards;
};

const toggleFavorite = async (userID, boardID, response) => {
  const { is_favorite } = await getSingleBoard(boardID);
  const updatedStatus = await toggleFavoriteBoard(is_favorite, userID, boardID);

  if (updatedStatus) {
    return {
      message: 'Marcado como favorito.',
    };
  }
  else {
    return {
      message: 'Se ha removido de tus favoritos.',
    };
  }
};

const deleteBoard = async (boardID, response) => {
  const board = await getSingleBoard(boardID);
  const userID = response.locals.user.id;

  if (!board || board.user_id !== userID) {
    response.status(404);
    return { message: 'El tablero que intentas eliminar no existe.' };
  }

  await eraseBoard(boardID);

  return {
    message: 'Tablero eliminado satisfactoriamente.',
  };
};

const getBoard = async (boardID, response) => {
  const board = await getSingleBoard(boardID);
  const userID = response.locals.user.id;

  if (!board || board.user_id !== userID) {
    response.status(404);
    return { message: 'El tablero solicitado no existe.' };
  }

  return board;
};

export {
  newBoard,
  getBoards,
  getFavorites,
  toggleFavorite,
  deleteBoard,
  getBoard,
};