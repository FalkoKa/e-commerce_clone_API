const express = require('express');
const router = express.Router();
const User = require('./../db/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

module.exports = router;
