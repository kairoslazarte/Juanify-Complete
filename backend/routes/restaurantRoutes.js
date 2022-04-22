import express from 'express'
const router = express.Router()
import {
  getRestaurants,
  createRestaurant,
  getRestaurantById,
  getTopRestaurants
//   getProductById,
//   deleteProduct,
//   createProduct,
//   updateProduct,
//   createProductReview,
//   getTopProducts,
} from '../controllers/restaurantController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getRestaurants).post(protect, admin, createRestaurant)
// router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopRestaurants)
router
  .route('/:id')
    .get(getRestaurantById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

export default router
