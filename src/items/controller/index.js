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
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports.editItem = async (res, parameters) => {
  const {
    id,
    name,
    price
  } = parameters;
  
  try {
    const item = await schemes.Item.findById(id);

    if (!item) {
      return res.status(404).json('Item not found')
    }

    item.name = parameters.name;
    item.price = parameters.price;
    await item.save();

    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports.deleteItem = async (res, parameters) => {
  const {
    id
  } = parameters;
  
  try {
    const item = await schemes.Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json('Item not found')
    }

    return res.status(201).json(true);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};