const express = require('express');
const router = express.Router();
const Product = require('./../db/Product');

router.get('/', async (req, res, next) => {
  const products = await Product.find();
  res.json({ products });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json({ product });
});

module.exports = router;
