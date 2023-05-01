const express = require('express');
const router = express.Router();
const Order = require('./../db/Order');
const User = require('./../db/User');
const Product = require('./../db/Product');

// upon click order
router.post('/new', async (req, res, next) => {
  const {
    id,
    paymentMethod,
    shippingAddress,
    orderedItems,
    subTotal,
    deliveryFee,
  } = req.body;
  try {
    const order = new Order({
      user: id,
      payment: paymentMethod,
      shippingAddress: shippingAddress,
      orderedItems: orderedItems,
      subTotal: subTotal,
      deliveryFee: deliveryFee,
      orderStatus: 'processing',
    });

    await order.save();
    const populatedUser = await Order.findOne({ user: id }).populate('user');
    res.json(populatedUser);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ user: id })
      .populate('orderedItems')
      .populate('user');
    res.json(order);
  } catch (error) {
    console.log(error);
  }
});

router.get('/all/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.find({ user: id }).populate('orderedItems');
    res.json(order);
  } catch (error) {
    console.log(error);
  }
});

router.get('/id/:id', async (req, res, next) => {
  const { id } = req.params;
  const { itemID } = req.body;

  try {
    const orders = await Order.find({ user: id }).populate('orderedItems');
    const orderedItemsIDs = orders
      .map((order) => order.orderedItems)
      .reduce((arr, orderItem) => {
        return [...arr, ...orderItem];
      }, [])
      .map((i) => {
        return i.items.toString().split('"')[0];
      })
      .includes(itemID);
    console.log(orderedItemsIDs);
    res.json({ purchased: orderedItemsIDs });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
