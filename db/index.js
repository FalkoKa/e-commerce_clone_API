const mongoose = require('mongoose');
const config = require('../config');
const Product = require('./Product');
const create = require('../models/user_model');
const Order = require('./Order');
const Cart = require('./Cart.js');

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('connected');
  })
  .catch((e) => console.log(e));

module.exports = mongoose;
