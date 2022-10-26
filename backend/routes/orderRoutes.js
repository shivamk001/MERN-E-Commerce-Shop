import express from "express";
import {addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrdersToDelivered} from '../controllers/orderControllers.js'
import { protect, admin } from "../middleware/authMiddleware.js";
const router=express.Router()
console.log('IN ORDER ROUTES')
router.route('/').post(protect, addOrderItem).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrdersToDelivered)
export default router