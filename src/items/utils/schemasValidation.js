const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const schemas = {
  createItem: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),

  editItem: Joi.object().keys({
    id: Joi.objectId().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),

  deleteItem: Joi.object().keys({
    id: Joi.objectId().required(),
    comment: Joi.string()
  }),

  undeleteItem: Joi.object().keys({
    id: Joi.objectId().required()
  }),

  getItem: Joi.object().keys({
    id: Joi.objectId().required()
  }),

  getItems: Joi.object().keys()
};

module.exports = schemas;