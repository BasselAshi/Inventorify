const config = require('../../../config');
const schemes = require('../models/mongoose');

module.exports.createItem = async (res, parameters) => {
  const {
    name,
    price
  } = parameters;
  
  const newItem = schemes.Item({
    name: parameters.name,
    price: parameters.price,
  });

  try {
    const savedItem = await newItem.save();
    return res.status(201).json(savedItem);

  } catch (error) {
    console.log(error)
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};