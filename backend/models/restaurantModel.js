import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)


const locationSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    long: {
      type: Number,
    },
    lat: {
      type: Number,
    },
    street: {
      type: String,
      required: true,
    },
    barangay: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      default: 8000,
      required: true
    }
  },
  {
    timestamps: true,
  }
)


const restaurantSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        reviews: [reviewSchema],
        products: [productSchema],
        location: locationSchema,
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
    timestamps: true,
    }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant
