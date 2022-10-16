import express from 'express'
//import products from './data/products.js'
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js' 
import userRoutes from './routes/userRoutes.js' 
import orderRoutes from './routes/orderRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
connectDB()
app.get('/',(req,res)=>{
    res.send('API is running!')
})

// app.get('/api/products',(req,res)=>{
//     res.json(products)
// })

// app.get('/api/products/:id',(req,res)=>{
//     const product=products.find(p=>p._id===req.params.id)
//     res.json(product)
// })

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use(notFound)
app.use(errorHandler)
app.get('/api/config/paypal', (req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const PORT=process.env.PORT||5000
app.listen(5000, console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}!`.yellow.bold))