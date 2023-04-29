const express = require('express');
const router = express.Router();
const User = require('./../db/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function createJsonWebToken(data) {
  return jwt.sign({ id: data.id, email: data.email }, process.env.SECRET, {
    expiresIn: '24h',
  });
}

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    let match = await bcrypt.compare(password, user.password_digest);

    if (!match) {
      throw new Error('Invalid email or password');
    }

    // user = payload
    let token = createJsonWebToken(user);

    res.json({ token, _id: user._id, name: user.fullName });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
