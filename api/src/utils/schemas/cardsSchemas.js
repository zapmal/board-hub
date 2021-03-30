import Joi from 'joi';

export const newCardSchema = Joi.object({ title: Joi.string().required() })
  .messages({
    'any.required': 'Este campo es requerido',
    'string.empty': 'No se permiten campos vacíos',
  });

export const editCardSchema = Joi.object({
  title: Joi.string().required(),
  duedate: Joi.date().required(),
  content: Joi.string().required(),
  completed: Joi.boolean().required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'string.empty': 'No se permiten campos vacíos',
    'date.empty': 'Debes proveer una fecha válida',
    'boolean.empty': 'La carta debe estar o terminada o por terminar',
    'boolean.base': 'Este campo es requerido',
  });
