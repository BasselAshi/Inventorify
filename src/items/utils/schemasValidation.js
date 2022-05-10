const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const schemas = {
  createItem: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),

  editItem: Joi.object().keys({
    id: Joi.objectId(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

module.exports = schemas;