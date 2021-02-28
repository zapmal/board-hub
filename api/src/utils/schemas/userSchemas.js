import Joi from 'joi';

export const updatePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  newPassword: Joi.string().required(),
  newPasswordConfirmation: Joi.string().valid(Joi.ref('newPassword')).required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'any.only': 'Las contraseñas deben coincidir',
    'string.min': 'Mínimo ocho (8) carácteres',
    'string.empty': 'No se permiten campos vacíos',
  });

export const updateUsernameSchema = Joi.object({
  username: Joi.string().required(),
  usernameConfirmation: Joi.string().valid(Joi.ref('username')).required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'any.only': 'Los nombres de usuario deben coincidir',
    'string.empty': 'No se permiten campos vacíos',
  });