import validateRequest from '@utils/schemas/validate';
import {
  updatePasswordSchema,
  updateUsernameSchema,
} from '@utils/schemas/userSchemas';

const validatePasswordUpdate = (request, response, next) => {
  request.body = validateRequest(
    request.body,
    response,
    updatePasswordSchema,
    next,
    true,
  );
};

const validateUsernameUpdate = (request, response, next) => {
  request.body = validateRequest(
    request.body,
    response,
    updateUsernameSchema,
    next,
    true,
  );
};

export {
  validatePasswordUpdate,
  validateUsernameUpdate,
};
