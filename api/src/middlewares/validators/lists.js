import logger from '@utils/logging';
import { user } from '@models';

const checkListsOwner = async (request, response, next) => {
  const userID = response.locals.user.id;
  const boardID = request.query.boardId || request.body.boardId;

  try {
    const { userBoards } = await user.findOne({
      where: { id: userID },
      include: 'userBoards',
    });

    const isOwnerOfBoard = userBoards.filter(b => b.id === Number(boardID));

    if (isOwnerOfBoard.length === 0) {
      return response
        .status(400)
        .json({
          message: 'No tienes permisos en este tablero.',
        });
    }

    next();
  }
  catch (error) {
    logger.error(error.message);
    return response
      .status(500)
      .json({ message: 'Hubo un error de nuestro lado, intenta otra vez.' });
  }
};

export {
  checkListsOwner,
};
