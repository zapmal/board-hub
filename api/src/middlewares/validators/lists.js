import validate from '@utils/schemas/validate';
import {
  updateOrderSchema,
} from '@utils/schemas/listsSchemas';
import logger from '@utils/logging';

const validateOrderUpdate = (request, response, next) => {
  const { error } = validate(updateOrderSchema, request.body);

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
  validateOrderUpdate,
};