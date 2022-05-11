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

    if (!item || item.currentDeletion) {
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
    id,
    comment
  } = parameters;
  
  try {
    const item = await schemes.Item.findById(id);
    if (!item || item.currentDeletion) {
      return res.status(404).json('Item not found');
    }

    const newDeletion = schemes.ItemDeletion({
      date: new Date(),
      comment: parameters.comment,
    });
    item.currentDeletion = newDeletion;
    item.deletionHistory.push(newDeletion);
    
    await item.save();

    return res.status(200).json(true);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports.undeleteItem = async (res, parameters) => {
  const {
    id,
  } = parameters;
  
  try {
    const item = await schemes.Item.findById(id);
    if (!item) {
      return res.status(404).json('Item not found');
    }
    if (!item.currentDeletion) {
      return res.status(400).json('Item is not deleted');
    }

    item.currentDeletion = null;
    await item.save();

    return res.status(200).json(true);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports.getItem = async (res, parameters) => {
  const {
    id
  } = parameters;
  
  try {
    const item = await schemes.Item.findById(id);

    if (!item || item.currentDeletion) {
      return res.status(404).json('Item not found')
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

module.exports.getItems = async (res, parameters) => {
  try {
    const items = await schemes.Item.find(
      { $or: [
        { currentDeletion: { $exists: false } }
      , { currentDeletion: null }
    ]});
    return res.status(200).json(items);

  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
};