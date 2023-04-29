const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  inStock: Number,
  createdAt: Date,
  colors: [String],
  brand: String,
  category: String,
  comments: [
    {
      user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
      comment: String,
    },
  ],
  rating: Number,
  numReviews: Number,
  images: [String],
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

module.exports = mongoose.model('Product', productSchema);
