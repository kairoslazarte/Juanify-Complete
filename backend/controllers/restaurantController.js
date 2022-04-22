import asyncHandler from 'express-async-handler'
import Restaurant from '../models/restaurantModel.js'

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
    const restaurant = new Restaurant({
      name: 'Another restaurant',
      user: req.user._id,
      image: '/images/sample.jpg',
      numReviews: 0,
      description: 'This is another sample restaurant',
      products: [
        {
            name: 'Sample chicken Special',
            image: '/images/lyndons-chicken.jpg',
            category: 'Ulam',
            price: 150,
            counInStock: 10
        },
        {
            name: 'Sample Sisig Special',
            image: '/images/lyndons-chicken-2.jpg',
            category: 'Ulam',
            price: 120,
            counInStock: 12
        },
        {
            name: 'Sample Burger Shawarma Special',
            image: '/images/lyndons-pata.jpg',
            category: 'Burgers',
            price: 100,
            counInStock: 20
        },
      ],
      location: {
        city: 'Davao City Sample',
        long: 7.2536838,
        lat: 125.3109879,
        street: 'Windy Avenue',
        barangay: 'Nagkaisang Nayon',
        zipCode: 1125
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
  


export {
  getRestaurants,
  createRestaurant,
  getTopRestaurants,
  getRestaurantById
}
