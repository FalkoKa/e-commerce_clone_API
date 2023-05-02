const express = require('express');
const router = express.Router();
const Cart = require('../db/cart.js');
const User = require('../db/User');
const Product = require('../db/Product');

// upon signup
router.post('/new', async (req, res, next) => {
  const { id } = req.body;
  try {
    const cart = new Cart({
      user: id,
      ordered: false,
    });
    await cart.save();
    const populatedUser = await Cart.findOne({ user: id }).populate('user');
    res.json(populatedUser);
  } catch (error) {
    console.log(error);
  }
});

// get single cart from a user
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const cart = await Cart.findOne({ user: id })
      .populate({
        path: 'items',
        populate: { path: 'item' },
      })
      .populate('user');
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

// post new items to cart
router.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { itemId } = req.body;

  try {
    const cart = await Cart.updateOne(
      { user: id },
      { $push: { items: { quantity: 1, item: itemId } } }
    );

    const updatedCart = await Cart.findOne({ user: id })
      .populate({
        path: 'items',
        populate: { path: 'item' },
      })
      .populate('user');
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
  }
});

// update cart
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { quantity, itemID } = req.body;
  try {
    const cart = await Cart.updateOne(
      { user: id, 'items.item': itemID },
      {
        $set: { 'items.$': { quantity: quantity, item: itemID } },
      }
    );
    console.log(cart);

    const updatedCart = await Cart.findOne({ user: id })
      .populate({
        path: 'items',
        populate: { path: 'item' },
      })
      .populate('user');
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
  }
});

// delete item from cart
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { itemId } = req.body;

  try {
    const cart = await Cart.updateOne(
      { user: id },
      { $pull: { items: { item: itemId } } }
    );

    const updatedCart = await Cart.findOne({ user: id }).populate({
      path: 'items',
      populate: { path: 'item' },
    });
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
  }
});

// delete all items from cart after order submitted
router.delete('/delete/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const cart = await Cart.updateOne({ user: id }, { $set: { items: [] } });

    const updatedCart = await Cart.findOne({ user: id }).populate('user');
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
