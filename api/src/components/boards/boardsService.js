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

const getSingleBoard = async (boardID) => {
  const foundBoard = await board.findOne({ where: { id: boardID } });

  console.log(foundBoard);

  return foundBoard;
};

const deleteUserBoard = async (boardID) => {
  await board.destroy({ where: { id: boardID } });
};

export {
  createBoard,
  getUserBoards,
  deleteUserBoard,
  getSingleBoard,
};