const defaultOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const validateSchema = (schema, data, options = defaultOptions) => {
  const { value, error } = schema.validate(data, options);

  return { value, error };
};

export default validateSchema;