import asyncHandler from 'express-async-handler'
import Restaurant from '../models/restaurantModel.js'
import User from '../models/userModel.js'
import Order from '../models/orderModel.js'

// @desc    Fetch all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Restaurant.countDocuments({ ...keyword })
  const restaurants = await Restaurant.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ restaurants, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getRestaurantById = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
  
    if (restaurant) {
      res.json(restaurant)
    } else {
      res.status(404)
      throw new Error('Restaurant not found')
    }
})

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = asyncHandler(async (req, res) => {
    const {
      userID,
      restaurantName,
      city,
      street,
      barangay,
      zipCode,
      lon,
      lat
    } = req.body

    const user = await User.findById(userID)

    if (user) {
      user.applyingForSeller = true 
      await user.save()
    } else {
      res.status(404)
      throw new Error('User not found')
    }

    const restaurant = new Restaurant({
      name: restaurantName,
      user: userID,
      location: {
        city: city,
        long: lon,
        lat: lat,
        street: street,
        barangay: barangay,
        zipCode: zipCode
      }
    })
  
    const createdRestaurant = await restaurant.save()
    res.status(201).json(createdRestaurant)
})

  
// @desc    Get top rated restaurants
// @route   GET /api/restaurants/top
// @access  Public
const getTopRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find({}).sort({ rating: -1 }).limit(6)
  
    res.json(restaurants)
})

// @desc    Get top rated restaurants
// @route   GET /api/restaurants/top
// @access  Public
const getRecentlyOrdered = asyncHandler(async (req, res) => {
  const orders = await Order.find({ 'user': req.user._id })

  const restaurants = await Restaurant.find({ '_id': orders.map((order) => (order.restaurant)) })

  res.json(restaurants)
})


// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createRestaurantReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    const alreadyReviewed = restaurant.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Restaurant already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    restaurant.reviews.push(review)

    restaurant.numReviews = restaurant.reviews.length

    restaurant.rating =
      restaurant.reviews.reduce((acc, item) => item.rating + acc, 0) /
      restaurant.reviews.length

    await restaurant.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})
  

// @desc    Update a restaurant
// @route   PUT /api/restaurant/
// @access  Private/Admin
const updateRestaurantDetails = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const restaurant = await Restaurant.findById(req.params.id)

  if (restaurant) {
    restaurant.name = name
    restaurant.price = price
    restaurant.description = description
    restaurant.image = image
    restaurant.brand = brand
    restaurant.category = category
    restaurant.countInStock = countInStock

    const updatedRestaurant = await restaurant.save()
    res.json(updatedRestaurant)
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/restaurants/product/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findOne({ 'user': req.user._id })

  if (restaurant) {
    await restaurant.products.pull(req.params.id)
    await restaurant.save()
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

// @desc    Update a product
// @route   PUT /api/restaurant/product/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    category,
    image,
    countInStock,
  } = req.body

  const restaurant = await Restaurant.findOne({ 'user': req.user._id })

  if (restaurant) {
    const { products } = restaurant
    for (var i = 0, len = products.length; i < len; i++) {
      if (products[i]._id == req.params.id) {
        products[i].name = name || products[i].name
        products[i].price = price || products[i].price
        products[i].category = category || products[i].category
        products[i].image = image || products[i].image
        products[i].countInStock = countInStock || products[i].countInStock
      } 
   }
    const updatedRestaurant = await restaurant.save()

    res.json({
      products: [{
        name: updatedRestaurant.name,
        price: updatedRestaurant.price,
        category: updatedRestaurant.category,
        image: updatedRestaurant.image,
        countInStock: updatedRestaurant.countInStock,
      }],
    })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})


// @desc    Create a product
// @route   POST /api/restaurants/product
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    category,
    image,
    countInStock,
  } = req.body

  const restaurant = await Restaurant.findOne({ 'user': req.user._id })

  if (restaurant) {
    const { products } = restaurant
    products.push(
      {
        name: name,
        price: price,
        image: image,
        category: category,
        countInStock: countInStock,
        numReviews: 0,
      }
    )
    const createdProduct = await restaurant.save()
    res.status(201).json(createdProduct)
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

export {
  getRestaurants,
  createRestaurant,
  getTopRestaurants,
  getRestaurantById,
  createRestaurantReview,
  updateRestaurantDetails,
  deleteProduct,
  updateProduct,
  createProduct,
  getRecentlyOrdered
}
