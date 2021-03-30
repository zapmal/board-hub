import Joi from 'joi';

export const newCardSchema = Joi.object({ title: Joi.string().required() })
  .messages({
    'any.required': 'Este campo es requerido',
    'string.empty': 'No se permiten campos vacíos',
  });

export const editCardSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().allow(''),
  duedate: Joi.date().allow(null),
  completed: Joi.boolean(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'string.empty': 'No se permiten campos vacíos',
    'date.base': 'La fecha límite debe ser una fecha válida',
    'boolean.base': 'La carta debe estar completada o por completar',
  });
