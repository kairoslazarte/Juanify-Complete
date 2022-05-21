import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  completeOrder,
  getMyOrders,
  getOrders,
  markAsPaid
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
// router.route('/:id/deliver').put(protect, updateOrderStatus)
router.route('/:id/update').put(protect, updateOrderStatus)
router.route('/:id/complete').put(protect, completeOrder)
router.route('/:id/mark-paid').put(protect, markAsPaid)

export default router