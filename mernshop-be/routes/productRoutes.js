import express from 'express';
import Product from '../models/productModel.js';
// asyncHandler will allow us to handle errors
// without having to use try catch in every route
import asyncHandler from 'express-async-handler';

const router = express.Router();

// whenever we use a mongoose method it returns a promise
// so we need to handle it with async await

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/',  asyncHandler(async (req, res)=> {
  const products = await Product.find({});
  res.json(products);
}))

// @desc    Fetch a single product
// @route   GET /api/product/:id
// @access  Public
router.get('/:id',  asyncHandler(async (req, res)=> {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}))

export default router;