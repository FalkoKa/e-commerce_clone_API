const express = require('express');
const app = express();
const config = require('./config');
const errorHandler = require('./middlewares/error_handler');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Joi = require('joi');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [
    '644b9755bbed96491fb0d901',
    { priceInCents: 10995, name: 'ANTORA JACKET - Hardshell jacket' },
  ],
  ['644b9755bbed96491fb0d902', { priceInCents: 1189, name: 'Tie' }],
  [
    '644b97a7fe223e402aa02e10',
    { priceInCents: 15995, name: 'AIR MAX 90 - Trainers' },
  ],
  [
    '644b97a7fe223e402aa02e13',
    { priceInCents: 2999, name: 'Straight leg jeans' },
  ],
  [
    '644be433ab6839e85e8e37c2',
    { priceInCents: 2255, name: 'SWIM MEN LOGO LENGTH - Swimming shorts' },
  ],
  ['644be433ab6839e85e8e37c3', { priceInCents: 3999, name: 'Wellies' }],
  [
    '644be433ab6839e85e8e37c5',
    { priceInCents: 5999, name: 'AIR PATROL PACK - Backpack' },
  ],
  ['644be433ab6839e85e8e37c6', { priceInCents: 8499, name: 'Short coat' }],
  [
    '644be6b408bac0257f5fd611',
    { priceInCents: 29900, name: 'APPLE WATCH SE GPS 40MM - Smartwatch' },
  ],
]);

// controller
const producteController = require('./controllers/product_controller');
const orderController = require('./controllers/order_controller');
const shoppingCartController = require('./controllers/shopping_cart_controller');
const userController = require('./controllers/user_controller');

app.set('view engine', 'ejs');

// app.use(cors({
//   origin: "https://falkoka.github.io/e-commerce_clone_react/"
// }))

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // don't need?
app.use(express.json());
app.use(require('./middlewares/method_override')); // don't need?

function checkAuth(req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      console.log(err.message);
      console.log(decoded);
      req.user = err ? null : decoded;
      if (err) {
        return res.json({ message: 'You have no access rights' });
      }
      return next();
    });
  } else {
    req.user = null;
    return res.json({ message: 'You have no access rights' });
  }
}

function checkToken(req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      req.user = err ? null : decoded;
      return next();
    });
  } else {
    req.user = null;
    next();
  }
}

app.use(checkToken);

app.get('/', checkAuth, (req, res) => {
  res.json({ test: 'string' });
});

app.use('/api/v1/product', producteController);
app.use('/api/v1/order', orderController);
app.use('/api/v1/cart', shoppingCartController);
app.use('/api/v1/user', userController);

app.post('/create-checkout-session', async (req, res, next) => {
  const { items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item) => {
        console.log(item);
        const storeItem = storeItems.get(item.item._id);
        console.log('store item ' + storeItem);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/checkout/success`,
      cancel_url: `${process.env.SERVER_URL}/canceled`,
    });
    console.log(session.payment_status);

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
