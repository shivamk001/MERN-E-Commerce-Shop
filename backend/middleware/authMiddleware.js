import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler';

export const protect=asyncHandler(async(req,res,next)=>{
    let token
    console.log('REQ HEADERS AUTHORIZATION:',req.headers.authorization)
    console.log('TOKEN:',req.headers.authorization.split(' ')[1])
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token, process.env.JWT_SECRET)

            req.user=await User.findById(decoded.id).select('-password')
            console.log('REQ USER:', req.user)
            next()
        }
        catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        console.log('IS ADMIN')
        next()
    }
    else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}