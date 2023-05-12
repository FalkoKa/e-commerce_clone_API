const express = require('express');
const router = express.Router();
const User = require('../db/User');
const Cart = require('../db/cart.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const create = require('../models/user_model');

function createJsonWebToken(data) {
  return jwt.sign({ _id: data.id, email: data.email }, process.env.SECRET, {
    // added _ before id
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

    if (!user) {
      throw new Error('Invalid email or password');
    }
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

router.post('/new', async (req, res, next) => {
  const { email, password, fullName } = req.body.signupUser;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new Error('Email already used');
    }

    const newUser = await create(fullName, email, password);
    await newUser.save();

    const user = await User.findOne({ email: email });

    const cart = await new Cart({
      user: user._id,
    });
    await cart.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
