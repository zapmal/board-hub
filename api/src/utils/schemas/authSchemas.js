import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  passwordConfirmation: Joi.string().valid(Joi.ref('password')).required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'any.only': 'Las contraseñas deben coincidir',
    'string.min': 'Mínimo ocho (8) carácteres',
    'string.empty': 'No se permiten campos vacíos',
    'string.email': 'Debes proveer un email válido',
  });

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'string.min': 'Mínimo ocho (8) carácteres',
    'string.empty': 'No se permiten campos vacíos',
    'string.email': 'Debes proveer un email válido',
  });