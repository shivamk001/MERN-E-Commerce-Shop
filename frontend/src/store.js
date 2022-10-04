import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
//import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'

const reducer=combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers
})

const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

const initialState={cart: {cartItems: cartItemsFromStorage}}

const middleware=[thunk]

const store=configureStore({
    reducer: reducer,preloadedState: initialState,middleware: middleware
})

export default store