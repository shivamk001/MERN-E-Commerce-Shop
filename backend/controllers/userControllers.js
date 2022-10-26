import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

//@desc Fetch all products
//@route GET /api/products
//@access Public
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    //res.send({email,password})
    const user=await User.findOne({email})
    console.log('USER:',user)
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc Fetch user profile
//@route GET /api/users/profile
//@access Protected
const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email, password}=req.body
    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists.')
    }

    const user=await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Update user profile
//@route PUT /api/users/profile
//@access Protected
const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        if(req.body.password){
            user.password=req.body.password
        }
        const updatedUser=await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find()
    res.json(users)
})

//@desc Get user by ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserById=asyncHandler(async(req,res)=>{
    console.log('REQ PARAMS ID:', req.params.id)
    const user=await User.findById(req.params.id).select('-password')
    if(user){
        res.json({
            user
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        user.isAdmin=req.body.isAdmin
        const updatedUser=await user.save()
        console.log(updateUser)
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})
export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, getUserById, updateUser}