import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Restaurant from '../models/restaurantModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isSeller: user.isSeller,
      applyingForSeller: user.applyingForSeller,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      applyingForSeller: user.applyingForSeller,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const restaurant = await Restaurant.findOne({ 'user': req.params.id })

  if (user) {
    let applyingSeller
    if (req.body.isSeller == true) {
      applyingSeller = false
    } else {
      applyingSeller = false
      await restaurant.remove()
    }
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.isAdmin = req.body.isAdmin
    user.isSeller = req.body.isSeller
    user.applyingForSeller = applyingSeller

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      applyingForSeller: updatedUser.applyingForSeller,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get restaurant profile
// @route   GET /api/restaurant/profile
// @access  Private
const getRestaurantProfile = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findOne({ 'user': req.user._id })

  if (restaurant) {
    res.json({
      _id: restaurant._id,
      name: restaurant.name,
      description: restaurant.description,
      image: restaurant.image,
      products: restaurant.products,
      location: {
        city: restaurant.location.city,
        long: restaurant.location.long,
        lat: restaurant.location.lat,
        street: restaurant.location.street,
        barangay: restaurant.location.barangay,
        zipCode: restaurant.location.zipCode
      }
    })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})

const updateRestaurantProfile = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findOne({ 'user': req.user._id })

  if (restaurant) {
    restaurant.name = req.body.restaurantName || restaurant.name
    restaurant.location.city = req.body.city || restaurant.location.city
    restaurant.location.street = req.body.street || restaurant.location.street
    restaurant.location.barangay = req.body.barangay || restaurant.location.barangay
    restaurant.location.zipCode = req.body.zipCode || restaurant.location.zipCode
    restaurant.location.long = req.body.lon || restaurant.location.long
    restaurant.location.lat = req.body.lat || restaurant.location.lat
    restaurant.description = req.body.description || restaurant.description
    restaurant.image = req.body.image || restaurant.image
    const updatedRestaurant = await restaurant.save()

    res.json({
      name: updatedRestaurant.name,
      location: {
        city: updatedRestaurant.city,
        street: updatedRestaurant.steet,
        barangay: updatedRestaurant.barangay,
        zipCode: updatedRestaurant.zipCode,
        long: updatedRestaurant.lon,
        lat: updatedRestaurant.lat
      },
      description: updatedRestaurant.description,
      image: updatedRestaurant.image
    })
  } else {
    res.status(404)
    throw new Error('Restaurant not found')
  }
})


export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getRestaurantProfile,
  updateRestaurantProfile
}
