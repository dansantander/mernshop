import Order from '../models/orderModel.js';
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

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
})

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler (async (req, res) => {
  // REMEMBER:
  // req.params contains route parameters (in the path portion of the URL),
  // and req.query contains the URL query parameters (after the ? in the URL).
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if(order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
})

export { 
  addOrderItems,
  getOrderById
 }