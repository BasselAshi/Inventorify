const mongoose = require('../../../services/mongoose');

const Item = mongoose.model(
  'Item',
  {
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