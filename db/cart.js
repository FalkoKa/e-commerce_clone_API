const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cart: {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    ordered: Boolean,
    items: [
      {
        quantity: Number,
        item: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },
      },
    ],
  },
});

module.exports = mongoose.model('Cart', cartSchema);
