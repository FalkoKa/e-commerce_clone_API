const express = require('express');
const app = express();
const config = require('./config');
const errorHandler = require('./middlewares/error_handler');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Joi = require('joi');

// controller
const producteController = require('./controllers/product_controller');
const adminController = require('./controllers/admin_controller');
const orderController = require('./controllers/order_controller');
const reviewController = require('./controllers/review_controller');
const shoppingCartController = require('./controllers/shopping_cart_controller');
const userController = require('./controllers/user_controller');
const categoryController = require('./controllers/category_controller');
const brandController = require('./controllers/brand_controller');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // don't need?
app.use(express.json());
app.use(require('./middlewares/method_override')); // don't need?

app.get('/', (req, res) => {
  res.json({ test: 'string' });
});

app.use('/api/v1/product', producteController);
app.use('/api/v1/admin', adminController);
app.use('/api/v1/order', orderController);
app.use('/api/v1/review', reviewController);
app.use('/api/v1/cart', shoppingCartController);
app.use('/api/v1/user', userController);
app.use('/api/v1/category', categoryController);
app.use('/api/v1/brand', brandController);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
