const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password_digest: String,
  createdAt: Date,
  isAdmin: Boolean,
  shippingAddress: {
    street: String,
    city: String,
    zipCode: String,
    country: String,
  },
  cart: {
    paymentMethod: String,
    status: String,
    items: [{ quantity: Number, item: mongoose.SchemaTypes.ObjectId }],
  },
});

module.exports = mongoose.model('User', userSchema);
