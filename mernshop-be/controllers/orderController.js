import Order from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler (async (req, res) => {
  const { 
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      // Since this route is protected, we are able to grab
      // our user from our middleware authentication
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const cretedOder = await order.save();
    res.status(201).json(cretedOder);
  }
})

export { addOrderItems }