const mongoose = require('../../../services/mongoose');

const Item = mongoose.model(
  'Item',
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  'items'
);

module.exports = {
  Item,
};