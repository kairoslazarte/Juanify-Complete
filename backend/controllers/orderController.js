import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Restaurant from '../models/restaurantModel.js'
import User from '../models/userModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    restaurant,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  
  const restau = await Restaurant.findById(restaurant)

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    console.log(restau.name)
    const order = new Order({
      restaurant, 
      restaurantName: restau.name,
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'first_name middle_name last_name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const markAsPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'first_name middle_name last_name email'
  )

  const {
    id,
    email
  } = order.user

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      status: "COMPLETED",
      update_time: Date.now(),
      email_address: email,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/update
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  const {orderStatus} = req.body

  if (order) {
    console.log(orderStatus)
    if (orderStatus == 'or') {
      order.isRecieved = true
      order.isOnTheKitchen = false
      order.isOnTheWay = false
      order.isDelivered = false
    }
    else if (orderStatus == 'itk') {
      order.isRecieved = false
      order.isOnTheKitchen = true
      order.isOnTheWay = false
      order.isDelivered = false
      console.log('true')
    }
    else if (orderStatus == 'otw') {
      order.isRecieved = false
      order.isOnTheKitchen = false
      order.isOnTheWay = true
      order.isDelivered = false
    }
    else {
      order.isRecieved = false
      order.isOnTheKitchen = false
      order.isOnTheWay = false
      order.isDelivered = true
      order.deliveredAt = Date.now()
    }
    
    await order.save()
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


const completeOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isComplete = true
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Seller
const getOrders = asyncHandler(async (req, res) => {  
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const restaurant = await Restaurant.findOne({ 'user': req.user._id })
  const orders = await Order.find({ 'restaurant': restaurant._id }).populate('user', `id first_name middle_name last_name`)
  const count = await Order.countDocuments({ ...orders })
  
  res.json({orders, page, pages: Math.ceil(count / pageSize) })
})

export {
  addOrderItems,
  getOrderById, 
  updateOrderToPaid,
  updateOrderStatus,
  completeOrder,
  getMyOrders,
  getOrders,
  markAsPaid
}
