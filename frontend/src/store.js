import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
//import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

const reducer=combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})

const initialState={}

const middleware=[thunk]

const store=configureStore({
    reducer: reducer,preloadedState: initialState,middleware: middleware
})

export default store