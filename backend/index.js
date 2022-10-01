import express from 'express'
//import products from './data/products.js'
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js' 
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()
const app=express()
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

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT||5000
app.listen(5000, console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}!`.yellow.bold))