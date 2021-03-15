import validate from '@utils/schemas/validate';
import {
  newCardSchema,
} from '@utils/schemas/cardsSchemas';
import logger from '@utils/logging';

const validateNewCard = (request, response, next) => {
  const { error } = validate(newCardSchema, request.body);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    logger.error(errors);
    return response.status(400).json({ message: errors });
  }
  else {
    next();
  }
};

export {
  validateNewCard,
};