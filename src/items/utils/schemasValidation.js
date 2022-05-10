const Joi = require('joi');

const schemas = {
  createItem: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

module.exports = schemas;