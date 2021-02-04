import Joi from 'joi';
import validateSchema from '@libs/validateSchema';

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

  const { value, error } = validateSchema(schema, request.body);

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

  const { value, error } = validateSchema(schema, request.body, {
    abortEarly: false,
    allowUnknown: false,
  });

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