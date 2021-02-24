import { board } from '@models';

const createBoard = async (userID, name, description, isFavorite) => {
  const newBoard = await board.create({
    name,
    description,
    is_favorite: isFavorite,
    user_id: userID,
  });

  return newBoard;
};

const getUserBoards = async (userID) => {
  const boards = await board.findAll({ where: { user_id: userID } });

  return boards;
};

const getFavorites = async (userID) => {
  const boards = await board.findAll({ where: { user_id: userID, is_favorite: '1' } });

  return boards;
};

const toggleFavorite = async (isFavorite, userID, boardID) => {
  if (isFavorite) {
    await board.update({ is_favorite: 0 },
      {
        where: {
          user_id: userID,
          id: boardID,
        },
      },
    );

    return false;
  }
  else {
    await board.update({ is_favorite: 1 },
      {
        where: {
          user_id: userID,
          id: boardID,
        },
      },
    );

    return true;
  }
};

const getSingleBoard = async (boardID) => {
  const foundBoard = await board.findOne({ where: { id: boardID } });

  return foundBoard;
};

const deleteUserBoard = async (boardID) => {
  await board.destroy({ where: { id: boardID } });
};

export {
  createBoard,
  getUserBoards,
  getFavorites,
  toggleFavorite,
  deleteUserBoard,
  getSingleBoard,
};