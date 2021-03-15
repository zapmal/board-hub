import Joi from 'joi';

export const updateOrderSchema = Joi.object({ 
  previousListId: Joi.number().required(),
  previousListOrder: Joi.number().required(),
  movedListId: Joi.number().required(),
  movedListOrder: Joi.number().required(),
})
  .messages({
    'any.required': 'Este campo es requerido',
    'number.empty': 'No se permiten campos vacíos',
  });