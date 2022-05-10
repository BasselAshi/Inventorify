const Joi = require('joi');

const schemas = {
  createItem: Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

module.exports = schemas;