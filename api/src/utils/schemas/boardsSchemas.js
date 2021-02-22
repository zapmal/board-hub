import Joi from 'joi';

export const newBoardSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'string.empty': 'No se permiten campos vacíos',
  });