import {
  createBoard,
  getUserBoards,
  deleteUserBoard,
  getSingleBoard,
} from './boardsService';

const newBoard = async (userID, name, description, isFavorite) => {
  const board = await createBoard(userID, name, description, isFavorite);

  return {
    message: 'Tablero creado exitosamente.',
    board,
  };
};

const getBoards = async (userID, response) => {
  const boards = await getUserBoards(userID);

  if (boards.length === 0) {
    response.status(404);
    return {};
  }

  return boards;
};

const deleteBoard = async (boardID, response) => {
  const board = await getSingleBoard(boardID);

  if (!board) {
    response.status(404);
    return { message: 'El tablero que intentas eliminar no existe.' };
  }

  await deleteUserBoard(boardID);

  return {
    message: 'Tablero eliminado satisfactoriamente.',
  };
};

const getBoard = async (boardID, response) => {
  const board = await getSingleBoard(boardID);

  if (!board) {
    response.status(404);
    return { message: 'El tablero solicitado no existe.' };
  }

  return board;
};

export {
  newBoard,
  getBoards,
  deleteBoard,
  getBoard,
};