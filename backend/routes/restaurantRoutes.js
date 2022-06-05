import express from 'express'
const router = express.Router()
import {
  getRestaurants,
  createRestaurant,
  getRestaurantById,
  getTopRestaurants,
  createRestaurantReview, 
  deleteProduct,
  updateProduct,
  createProduct,
  getRecentlyOrdered
} from '../controllers/restaurantController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getRestaurants).post(createRestaurant)
router.route('/:id/reviews').post(protect, createRestaurantReview)
router.get('/top', getTopRestaurants)
router.get('/recent', protect, getRecentlyOrdered )
router
  .route('/:id')
    .get(getRestaurantById)
router.route('/product').post(protect, createProduct)
router
  .route('/product/:id')
    .delete(protect, deleteProduct)
    .put(protect, updateProduct)

export default router
