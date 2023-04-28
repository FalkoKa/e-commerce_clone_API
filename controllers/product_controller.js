const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.json({ testtt: 'test' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id: id });
});

module.exports = router;
