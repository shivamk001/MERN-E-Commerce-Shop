import express from "express";
import {addOrderItem, getOrderById, updateOrderToPaid, getMyOrders} from '../controllers/orderControllers.js'
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router()
console.log('IN ORDER ROUTES')
router.route('/').post(protect, addOrderItem)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
export default router