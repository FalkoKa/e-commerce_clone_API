// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
//   payment: String,
//   shippingAddress: {
//     street: String,
//     city: String,
//     zipCode: String,
//     country: String,
//   },
//   orderedItems: { type: mongoose.SchemaTypes.ObjectId, ref: 'Cart' },
//   subTotal: Number,
//   deliveryFee: Number,
//   orderStatus: {
//     type: String,
//     enum: ['processing', 'shipped', 'delivered'],
//   },
//   createdAt: { type: Date, default: () => Date.now(), immutable: true },
// });

// module.exports = mongoose.model('Order', orderSchema);

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
  orderedItems: [
    {
      quantity: Number,
      items: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },
    },
  ],
  subTotal: Number,
  deliveryFee: Number,
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

module.exports = mongoose.model('Order', orderSchema);
