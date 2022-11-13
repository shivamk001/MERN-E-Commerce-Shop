import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
//import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, productTopRatedReducer } from './reducers/productReducers'
import { userDeleteReducer, userLoginReducer } from './reducers/userReducers'
import { cartReducers } from './reducers/cartReducers'
import { userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'

const reducer=combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer, 
    productTopRated: productTopRatedReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,

})

const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')): null
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')): {}

const initialState={cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
                    user:{userInfo: userInfoFromStorage}
                }

const middleware=[thunk]

const store=configureStore({
    reducer: reducer,preloadedState: initialState,middleware: middleware
})

export default store