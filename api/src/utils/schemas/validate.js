import logger from '@utils/logging';

const defaultOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

/**
 * Function that validates the given request, it has two extra options.
 *
 * Currently has a bug that if two errors in the errors array are equal it still
 * prints both.
 *
 * 1. rewriteBody is for validations that after they're succesful need to
 * rewrite it for any reason.
 * 2. options is in case that the validation needs different options (not allowing
 * unknown, not aborting early, etc).
 */
export const validateRequest = (
  requestBody,
  response,
  schema,
  next,
  rewriteBody = false,
  options = defaultOptions,
) => {
  const { value, error } = schema.validate(requestBody, options);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    logger.error(errors);
    return response.status(400).json({ message: errors });
  }
  else {
    if (rewriteBody) {
      next();
      return value;
    }
    next();
  }
};

export default validateRequest;
