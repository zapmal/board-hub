import logger from '@utils/logging';

const defaultOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const validateSchema = (schema, data, options = defaultOptions) => {
  const { value, error } = schema.validate(data, options);

  return { value, error };
};

const validateRequest = (
  requestBody,
  response,
  schema,
  next,
  rewriteBody = false,
) => {
  const { value, error } = validateSchema(schema, requestBody);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    logger.error(errors);
    return response.status(400).json({ message: errors });
  }
  else {
    if (rewriteBody) {
      return value;
    }
    next();
  }
};

export default validateSchema;