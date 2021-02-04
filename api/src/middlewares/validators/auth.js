import Joi from 'joi';

/**
 * If needed, this can be abstracted a little bit more
 * in a separate function/file that receives:
 * (schema, options, data).
*/
const validateSignup = (request, response, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Password does not match.',
    }),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const {
    error,
    value,
  } = schema.validate(request.body, options);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');
    response
      .status(400)
      .json({
        errors,
      });
  }
  else {
    request.body = value;
    next();
  }
};

const validateSignin = (request, response, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const {
    error,
    value,
  } = schema.validate(request.body, options);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');
    response
      .status(400)
      .json({
        errors,
      });
  }
  else {
    request.body = value;
    next();
  }
};

export {
  validateSignin,
  validateSignup,
};