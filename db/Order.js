const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  payment: String,
  shippingAddress: {
    street: String,
    city: String,
    zipCode: String,
    country: String,
  },
  orderedItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Cart' }],
  orderTotal: Number,
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

module.exports = mongoose.model('Order', orderSchema);
