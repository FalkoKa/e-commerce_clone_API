const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Please enter you full Name'] },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    lowercase: true,
    minLength: 5,
  },
  password_digest: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  isAdmin: Boolean,
});

module.exports = mongoose.model('User', userSchema);
