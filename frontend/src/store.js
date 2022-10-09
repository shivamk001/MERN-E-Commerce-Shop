import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
//import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { userLoginReducer } from './reducers/userReducers'
import { cartReducers } from './reducers/cartReducers'
import { userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'

const reducer=combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
})

const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')): null

const initialState={cart: {cartItems: cartItemsFromStorage},
                    user:{userInfo: userInfoFromStorage}
                }

const middleware=[thunk]

const store=configureStore({
    reducer: reducer,preloadedState: initialState,middleware: middleware
})

export default store