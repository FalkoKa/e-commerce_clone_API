const mongoose = require('mongoose');
const config = require('../config');
const User = require('./User');

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('connected');
  })
  .catch((e) => console.log(e));

run();
async function run() {
  const user = new User({
    fullName: 'Falko Kammel',
    email: 'falkokammel@gmx.de',
    password_digest: '',
    isAdmin: true,
    shippingAddress: {
      street: 'Schoenauserstrasse 16',
      zipCode: '67547',
      city: 'Worms',
      country: 'Germany',
    },
    cart: {
      paymentMethod: 'PayPal',
      status: 'pending',
      items: [],
    },
  });

  await user.save();
  console.log(user);
}

module.exports = mongoose;
