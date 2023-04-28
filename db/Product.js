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
  comments: [{ user: mongoose.SchemaTypes.ObjectId, comment: String }],
  rating: Number,
  numReviews: Number,
  images: [String],
});

module.exports = mongoose.model('User', userSchema);
