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
  // console.log('order in controller', order)
  if(order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler (async (req, res) => {

  const order = await Order.findById(req.params.id);

  if(order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // All of this comes from the PayPal result
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler (async (req, res) => {
  //console.log(req)
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
})

export { 
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
 }