import Joi from 'joi';

export const updateOrderSchema = Joi.object({
  sourceListId: Joi.number().required(),
  sourceListOrder: Joi.number().required(),
  destinationListId: Joi.number().required(),
  destinationListOrder: Joi.number().required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'number.empty': 'No se permiten campos vacíos',
  });