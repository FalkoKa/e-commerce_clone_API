const express = require('express');
const router = express.Router();
const Cart = require('./../db/Cart');
const User = require('./../db/User');

router.post('/new', async (req, res, next) => {
  const { id } = req.body;

  console.log(id);
  try {
    const cart = new Cart({
      user: id,
      ordered: false,
    });
    await cart.save();

    const populatedUser = await Cart.findOne({ user: id }).populate('user');
    console.log(populatedUser);

    res.json(populatedUser);
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res, next) => {});

module.exports = router;
