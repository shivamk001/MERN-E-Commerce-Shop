import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'

//@desc Create new order
//@route GET /api/orders
//@access Private
const addOrderItem=asyncHandler(async(req,res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice}=req.body
    console.log('REQ BODY:', req.body)
    console.log('ORDERITEMS:', orderItems)
    console.log('SHIPPINGADDRESS:', shippingAddress)
    console.log('paymentMethod:', paymentMethod)
    console.log('itemsPrice:', itemsPrice)
    console.log('taxPrice:', taxPrice)
    console.log('shippingPrice:', shippingPrice)
    console.log('totalPrice:', totalPrice)

    if(orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('No Order Items')
        return
    }
    else{
        const order=new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder=await order.save()

        res.status(201).json(createdOrder)
    }
})

//@desc Create order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById=asyncHandler(async(req,res)=>{
    console.log('IN GET ORDER')
    const order=await Order.findById(req.params.id).populate('user', 'name email')
    console.log('ORDER in getOrderById:', order)
    if(order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid=asyncHandler(async(req,res)=>{
    console.log('IN UPDATE ORDER TO PAID')
    const order=await Order.findById(req.params.id)
    console.log('ORDER in updateOrderToPaid:', order)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user: req.user._id})
    res.json(orders)
})

//@desc Get all orders
//@route GET /api/orders
//@access Private/admin
const getOrders=asyncHandler(async(req,res)=>{
    console.log('IN GET ORDER')
    const order=await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

//@desc Update order to delivered
//@route GET /api/orders/:id/delivered
//@access Private/admin
const updateOrdersToDelivered=asyncHandler(async(req,res)=>{
    console.log('IN UPDATE ORDER TO DELIVERED')
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
        const updatedOrder=await Order.save()
        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order Not Found')
    }
})
export {addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrdersToDelivered}