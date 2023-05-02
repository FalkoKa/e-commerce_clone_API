const bcrypt = require('bcrypt');
const User = require('../db/User');

function create(name, email, password) {
  console.log(name);
  console.log(email);
  console.log(password);
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) => {
      return new User({
        fullName: name,
        email: email,
        password_digest: hash,
        isAdmin: false,
      });
    });
}

module.exports = create;
