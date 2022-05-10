const mongoose = require('../../../services/mongoose');

const ItemDeletionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    comment: String
  },
);
const ItemDeletion = mongoose.model('Item Deletion', ItemDeletionSchema, 'item deletions')

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
    },
    currentDeletion: ItemDeletionSchema,
    deletionHistory: [ItemDeletionSchema]
  },
  'items'
);

module.exports = {
  Item,
  ItemDeletion
};