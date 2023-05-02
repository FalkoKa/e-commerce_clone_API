const express = require('express');
const router = express.Router();
const Product = require('./../db/Product');

router.get('/', async (req, res, next) => {
  const products = await Product.find();
  res.json({ products });
});

router.get('/brand/:brand', async (req, res, next) => {
  const { brand } = req.params;
  const regex = brand;

  try {
    const products = await Product.find({
      brand: { $regex: new RegExp(regex, 'i') },
    });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json({ product });
});

router.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  // update rating and numOfReviews
  // return new product and put it into item (setItem on client side)
});

module.exports = router;
