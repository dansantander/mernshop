import Product from '../models/productModel.js';
// asyncHandler will allow us to handle errors
// without having to use try catch in every route
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler (async (req, res) => {
  const products = await Product.find({});
  res.json(products);
})

// @desc    Fetch a single product
// @route   GET /api/product/:id
// @access  Public
const getProductById = asyncHandler (async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else { // This will be fired if we give a wrong id (but with the same length)
    res.status(404); // We set this to be 404 but by default it's 500
    throw new Error('Product not found');
    // Before we defined our error handler, we used:
    // res.status(404).json({ message: 'Product not found' });
  }
})

export {
  getProductById,
  getProducts
}
