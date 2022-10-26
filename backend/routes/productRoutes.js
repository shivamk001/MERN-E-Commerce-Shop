import express from "express";
import {getProductById,getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts} from '../controllers/productControllers.js'
import { protect, admin } from "../middleware/authMiddleware.js";
const router=express.Router()

//@desc Fetch all products
//@route GET /api/products
//@access Public
console.log('IN PRODUCT ROUTES')
router.get('/top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/').get((req,res,next)=>{console.log('PRODUCT ROUTES:', req.query.keyword, req.url)
                                        next()},getProducts).post(protect,admin,createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect,admin,updateProduct)


export default router