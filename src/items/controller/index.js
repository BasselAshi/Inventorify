const config = require('../../../config');

// TODO: Item creation
module.exports.createItem = async (res, parameters) => {
  const {
    id,
    name,
    price
  } = parameters;
  
  return res.send("Item creation here");
};