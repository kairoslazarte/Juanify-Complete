import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Restaurant from '../models/restaurantModel.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'qfkrlazarte@tip.edu.ph',
    pass: '@Elohimfcan21',
  },
});

const EMAIL_SECRET = 'asdf16568944asd6s1a64as9d9aa11'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    if (!user.confirmed) {
      throw new Error('Email not yet confirmed!')
    }
    else {
      res.json({
        _id: user._id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        phone: user.phone,
        confirmed: user.confirmed,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user._id),
      })
    }
  } 
  else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName: first_name, middleName: middle_name, lastName: last_name, email, phone, password } = req.body

  const userExists_email = await User.findOne({ email })
  const userExists_phone = await User.findOne({ phone })

  if (userExists_email) {
    res.status(400)
    throw new Error('User already exists - email already taken')
  }

  if (userExists_phone) {
    res.status(400)
    throw new Error('User already exists - phone number already taken')
  }

  const user = await User.create({
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      isSeller: user.isSeller,
      applyingForSeller: user.applyingForSeller,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })

    const emailToken = jwt.sign(
      {
        user: user._id,
      },
      EMAIL_SECRET,
      {
        expiresIn: '1d',
      },
    );

    const url = `https://juanify-complete.onrender.com/api/users/confirmation/${emailToken}`;

    let mailOptions = {
      from: 'Juanify <qfkrlazarte@tip.edu.ph>',
      to: email,
      subject: 'Email confirmation',
      html: `Thank you for signing up ka-Juan! <br><br>
      Please click the link below to confirm your email: <br> 
      <a href="${url}">${url}</a>`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Message Sent!');
      }
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const confirmUserEmail = asyncHandler(async (req, res) => {

  const { user: _id } = jwt.verify(req.params.token, EMAIL_SECRET)

  const user = await User.findById(_id)

  if (user) {
    user.confirmed = true

    await user.save()

    return res.redirect('https://juanify-complete.onrender.com/login');
  } else {
    res.status(404)
    throw new Error('User not found')
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
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
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
    user.first_name = req.body.first_name || user.first_name
    user.middle_name = req.body.middle_name || user.middle_name
    user.last_name = req.body.last_name || user.last_name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      middle_name: updatedUser.middle_name,
      last_name: updatedUser.last_name,
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
  const keyword = req.query.keyword
    ? {
        first_name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const users = await User.find({ ...keyword })
  res.json({ users })
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const restaurant = await Restaurant.findOne({ 'user': req.params.id })


  if (user) {
    await user.remove()
    if (restaurant) {
      await restaurant.remove()
    }
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

      let mailOptions = {
        from: 'Juanify <qfkrlazarte@tip.edu.ph>',
        to: req.body.email,
        subject: 'Your application has been approved!',
        html: `Congratulations, ${req.body.first_name} ${req.body.last_name}! <br><br>
        Your application has been approved, welcome to Juanify! We look forward partnering with you! <br>
        Login and setup your restaurant now! <br>
        If you have any questions or clarifications, feel free to ask us. <br><br><br>

        Regards, <br>
        Juanify `,
      }
  
      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.log('Error', err);
          } else {
              console.log('Message Sent!');
          }
      })
    } else {
      applyingSeller = false

      let mailOptions = {
        from: 'Juanify <qfkrlazarte@tip.edu.ph>',
        to: req.body.email,
        subject: 'Your application has been declined',
        html: `Hi ${req.body.first_name} ${req.body.last_name}, <br><br>
        We are sorry to say but we cannot accept your application to Partner with us as of this time. If you have any questions or clarifications, feel free to ask us. Thank you. <br><br><br>

        Regards, <br>
        Juanify `,
      }
  
      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.log('Error', err);
          } else {
              console.log('Message Sent!');
          }
      })
      if (restaurant) {
        await restaurant.remove()
      }
    }
    user.first_name = req.body.first_name || user.first_name
    user.middle_name = req.body.middle_name || user.middle_name
    user.last_name = req.body.last_name || user.last_name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.isAdmin = req.body.isAdmin
    user.isSeller = req.body.isSeller
    user.applyingForSeller = applyingSeller

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      middle_name: updatedUser.middle_name,
      last_name: updatedUser.last_name,
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
  updateRestaurantProfile,
  confirmUserEmail
}
