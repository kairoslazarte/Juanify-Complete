import asyncHandler from 'express-async-handler'
import Restaurant from '../models/restaurantModel.js'
import User from '../models/userModel.js'

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
  // restaurants.map((restaurant) => {
  //   restaurant.products.map((product) => {
  //     console.log(product.name)
  //   })
  // })
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
    const restaurants = await Restaurant.find({}).sort({ rating: -1 }).limit(3)
  
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
  


export {
  getRestaurants,
  createRestaurant,
  getTopRestaurants,
  getRestaurantById,
  createRestaurantReview
}
