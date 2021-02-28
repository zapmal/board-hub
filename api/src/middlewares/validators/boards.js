import validate from '@utils/schemas/validate';
import { newBoardSchema } from '@utils/schemas/boardsSchemas';
import logger from '@utils/logging/logger';

import { board } from '@models';

const validateNewBoard = (request, response, next) => {
  const { error } = validate(newBoardSchema, request.body);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    logger.error(errors);
    return response.status(400).json({ message: errors });
  }
  else {
    next();
  }
};

const checkDuplicatedBoardName = async (request, response, next) => {
  const { name } = request.body;
  const userID = response.locals.user.id;

  try {
    const boardAlreadyExists = await board.findOne({ where: { name, user_id: userID } });

    if (boardAlreadyExists) {
      return response
        .status(400)
        .json({
          message: 'Ya tienes un tablero con ese nombre, intenta con otro.',
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
  validateNewBoard,
  checkDuplicatedBoardName,
};
