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

module.exports = router;

// {
//     "id": "644c972c0769daed56fc6010",
//     "paymentMethod": "PayPal",
//     "shippingAddress": {
//         "street": "Schoenauerstrasse 16",
//         "city": "Worms",
//         "zipCode": "67547",
//         "country": "Germany"
//     },
//     "cartID": "644cd381af6c5052e2ac0c96",
//     "orderTotal": 323.23
// }
