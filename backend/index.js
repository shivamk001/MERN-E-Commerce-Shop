import express from 'express'
//import products from './data/products.js'
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import productRoutes from './routes/productRoutes.js' 
import userRoutes from './routes/userRoutes.js' 
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import { nextTick } from 'process'

dotenv.config()
const app=express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())
connectDB()

// app.get('/api/products',(req,res)=>{
//     res.json(products)
// })

// app.get('/api/products/:id',(req,res)=>{
//     const product=products.find(p=>p._id===req.params.id)
//     res.json(product)
// })

app.use('/api/products', (req, res, next)=>{console.log('PRODUCTROUTES MIDWARE')
                                        next()},productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))



const __dirname=path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if(process.env.NODE_ENV==='production'){
    console.log('PRODUCTION:',process.env.NODE_ENV, path.join(__dirname, '/frontend/build'))
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req,res)=>res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}
else{
    app.get('/',(req,res)=>{
        res.send('API is running!')
    })
}
console.log('__DIRNAME:',path.join(__dirname, '/uploads'))

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT||5000
app.listen(5000, console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}!`.yellow.bold))