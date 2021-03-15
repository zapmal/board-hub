import validate from '@utils/schemas/validate';
import {
  updatePasswordSchema,
  updateUsernameSchema,
} from '@utils/schemas/userSchemas';
import logger from '@utils/logging';

const validatePasswordUpdate = (request, response, next) => {
  const { value, error } = validate(updatePasswordSchema, request.body);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    logger.error(errors);
    return response.status(400).json({ message: errors });
  }
  else {
    request.body = value;
    next();
  }
};

const validateUsernameUpdate = (request, response, next) => {
  const { value, error } = validate(updateUsernameSchema, request.body);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    logger.error(errors);
    return response.status(400).json({ message: errors });
  }
  else {
    request.body = value;
    next();
  }
};

export {
  validatePasswordUpdate,
  validateUsernameUpdate,
};