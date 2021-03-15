import Joi from 'joi';

export const newCardSchema = Joi.object({ title: Joi.string().required() })
  .messages({
    'any.required': 'Este campo es requerido',
    'string.empty': 'No se permiten campos vacíos',
  });