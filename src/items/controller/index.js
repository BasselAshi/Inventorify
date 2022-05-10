const config = require('../../../config');
const schemes = require('../models/mongoose');

module.exports.createItem = async (res, parameters) => {
  const {
    id,
    name,
    price
  } = parameters;
  
  return res.send("Item creation here");
};