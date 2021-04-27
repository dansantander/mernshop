import express from 'express';
import { getProductById, getProducts } from '../controllers/productController.js';

/* We don't need this stuff after implementing controllers */
// import Product from '../models/productModel.js';
// asyncHandler will allow us to handle errors
// without having to use try catch in every route
// import asyncHandler from 'express-async-handler';

const router = express.Router();

/* FIRST APPROACH */
/*--- We were doing everything inside this file--*/
/*--- but then we implemented controllers--*/
/*--- The old version is as follows: --*/

// whenever we use a mongoose method it returns a promise
// so we need to handle it with async await

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
/* router.get('/',  asyncHandler(async (req, res)=> {
  const products = await Product.find({});
  res.json(products);
})) */

/* SECOND APPROACH */
/*--- We use controllers, so we just handle routes in here--*/

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router;